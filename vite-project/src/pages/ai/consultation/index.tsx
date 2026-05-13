import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Input,
  Button,
  Avatar,
  Space,
  message,
  Tag,
  Empty,
} from 'antd';
import { RobotOutlined, UserOutlined, SendOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth } from '@/hooks/useAuth';
import {
  getConsultationMessages,
  sendConsultationMessage,
  getConsultationDetail,
  getMyConsultationList,
} from '@/api/ai/consultation';
import type { ConsultationMessageVO, ConsultationVO } from '@/types/consultation';
import styles from './styles.module.less';

const { TextArea } = Input;

const ConsultationChat: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, userInfo } = useAuth();
  const [messages, setMessages] = useState<ConsultationMessageVO[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState<ConsultationVO | null>(null);
  const [currentConsultationId, setCurrentConsultationId] = useState<number | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, typingMessage]);

  // 加载最后一次问诊记录
  const loadLastConsultation = async () => {
    try {
      const res = await getMyConsultationList({
        queryDTO: {},
        page: 1,
        size: 1,
      });
      
      if (res.data.data.list?.length > 0) {
        const lastConsultation = res.data.data.list[0];
        setCurrentConsultationId(lastConsultation.id);
        navigate(`?id=${lastConsultation.id}`, { replace: true });
        await loadConsultation(lastConsultation.id);
      }
    } catch (error) {
      console.error('加载最后一次问诊记录失败:', error);
    }
  };

  // 初始化加载
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setCurrentConsultationId(Number(id));
      loadConsultation(Number(id));
    } else if (!location.state?.isNewChat) {
      loadLastConsultation();
    }
  }, [location.search]);

  // 打字机效果
  const typeMessage = async (message: ConsultationMessageVO) => {
    setIsTyping(true);
    let currentText = '';
    for (let i = 0; i < message.content.length; i++) {
      currentText += message.content[i];
      setTypingMessage(currentText);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setIsTyping(false);
    setTypingMessage('');
    // 打字机效果结束后，直接添加消息到列表
    setMessages(prev => [...prev, message]);
    setIsThinking(false);
  };

  // 加载问诊记录
  const loadConsultation = async (id: number) => {
    try {
      const [detailRes, messagesRes] = await Promise.all([
        getConsultationDetail(id),
        getConsultationMessages(id),
      ]);
      
      setMessages(messagesRes.data.data);
      setCurrentConsultation(detailRes.data.data);
      setIsThinking(false);
    } catch (error) {
      console.error('加载问诊记录失败:', error);
      message.error('加载问诊记录失败，请稍后重试');
    }
  };

  // 发送消息
  const handleSend = async () => {
    if (!isLoggedIn) {
      message.error('请先登录');
      return;
    }

    if (!inputValue.trim()) {
      message.warning('请输入问诊内容');
      return;
    }

    const content = inputValue.trim();
    setInputValue('');
    setIsThinking(true);

    // 立即添加用户消息到列表
    const userMessage: ConsultationMessageVO = {
      id: Date.now(), // 临时ID
      consultationId: currentConsultationId || 0,
      type: 'USER',
      typeDesc: '我',
      content: content,
      createdTime: new Date().toISOString(),
      sequence: messages.length + 1,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await sendConsultationMessage({
        consultationId: currentConsultationId || undefined,
        content,
      });

      const consultationId = res.data.data.consultationId;
      if (!currentConsultationId) {
        setCurrentConsultationId(consultationId);
        navigate(`?id=${consultationId}`, { replace: true });
      }

      // 获取最新消息
      const messagesRes = await getConsultationMessages(consultationId);
      const newMessages = messagesRes.data.data;
      
      // 找到最新的AI回复
      const lastAiMessage = newMessages[newMessages.length - 1];
      if (lastAiMessage && lastAiMessage.type === 'AI') {
        // 更新用户消息为服务器返回的版本
        const serverUserMessage = newMessages[newMessages.length - 2];
        if (serverUserMessage && serverUserMessage.type === 'USER') {
          setMessages(prev => prev.map(msg => 
            msg.id === userMessage.id ? serverUserMessage : msg
          ));
        }
        // 使用打字机效果显示AI回复
        await typeMessage(lastAiMessage);
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      message.error('发送消息失败，请稍后重试');
      setInputValue(content);
      // 发送失败时移除临时消息
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      setIsThinking(false);
    }
  };

  // 查看历史记录
  const handleViewHistory = () => {
    navigate('/ai/consultation/history');
  };

  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 开始新聊天
  const handleNewChat = () => {
    setCurrentConsultationId(null);
    setCurrentConsultation(null);
    setMessages([]);
    setInputValue('');
    setIsThinking(false);
    setTypingMessage('');
    setIsTyping(false);
    
    navigate('', { 
      replace: true,
      state: { isNewChat: true }
    });
  };

  return (
    <div className={styles.consultationChat}>
      <Card
        title={
          <Space>
            <RobotOutlined />
            <span>AI问诊</span>
            {currentConsultation && (
              <Tag color={
                currentConsultation.status === 'IN_PROGRESS' ? 'processing' :
                currentConsultation.status === 'COMPLETED' ? 'success' : 'error'
              }>
                {currentConsultation.statusDesc}
              </Tag>
            )}
          </Space>
        }
        extra={
          <Space>
            <Button
              type="primary"
              ghost
              icon={<RobotOutlined />}
              onClick={handleNewChat}
            >
              新对话
            </Button>
            <Button
              type="link"
              icon={<HistoryOutlined />}
              onClick={handleViewHistory}
            >
              历史记录
            </Button>
          </Space>
        }
        bordered={false}
        className={styles.chatCard}
      >
        <div className={styles.messageList}>
          {messages.length === 0 ? (
            <Empty
              description="开始您的问诊"
              className={styles.empty}
            />
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className={`${styles.messageItem} ${
                  item.type === 'USER' ? styles.userMessage : styles.aiMessage
                }`}
              >
                <div className={styles.nameText}>
                  {item.type === 'USER' ? userInfo?.nickname || '我' : '智能医生'}
                </div>
                <div className={styles.messageWrapper}>
                  <Avatar
                    className={styles.avatar}
                    icon={item.type === 'USER' ? <UserOutlined /> : <RobotOutlined />}
                    src={item.type === 'USER' ? userInfo?.avatar : undefined}
                    style={{ 
                      backgroundColor: item.type === 'USER' ? '#52c41a' : '#1890ff'
                    }}
                  />
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                      {item.content}
                    </div>
                    <div className={styles.messageTime}>
                      {dayjs(item.createdTime).format('HH:mm:ss')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {isTyping && typingMessage && (
            <div className={`${styles.messageItem} ${styles.aiMessage}`}>
              <div className={styles.nameText}>智能医生</div>
              <div className={styles.messageWrapper}>
                <Avatar 
                  className={styles.avatar} 
                  icon={<RobotOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                <div className={styles.messageContent}>
                  <div className={`${styles.messageText} ${styles.typing}`}>
                    {typingMessage}
                  </div>
                </div>
              </div>
            </div>
          )}
          {isThinking && !isTyping && (
            <div className={`${styles.messageItem} ${styles.thinking}`}>
              <div className={styles.nameText}>智能医生</div>
              <div className={styles.messageWrapper}>
                <Avatar 
                  className={styles.avatar} 
                  icon={<RobotOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>
                    智能医生正在思考中...
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="请描述您的症状..."
            autoSize={{ minRows: 2, maxRows: 6 }}
            disabled={isThinking}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!inputValue.trim() || isThinking}
          >
            发送
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConsultationChat; 