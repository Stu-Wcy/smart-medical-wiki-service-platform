import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  // 处理搜索建议
  const handleSearch = (value: string) => {
    // TODO: 实现搜索建议的API调用
    const mockSuggestions = [
      { value: '感冒', label: '感冒' },
      { value: '头痛', label: '头痛' },
      { value: '发烧', label: '发烧' },
    ].filter(item => item.value.includes(value));
    
    setOptions(value ? mockSuggestions : []);
  };

  // 处理搜索提交
  const handleSubmit = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <div className="search-bar">
      <AutoComplete
        options={options}
        onSearch={handleSearch}
        style={{ width: '100%' }}
      >
        <Search
          placeholder="搜索疾病、药品..."
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
          onSearch={handleSubmit}
        />
      </AutoComplete>
    </div>
  );
};

export default SearchBar; 