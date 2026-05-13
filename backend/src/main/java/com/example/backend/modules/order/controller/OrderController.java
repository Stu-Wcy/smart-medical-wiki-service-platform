package com.example.backend.modules.order.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.common.utils.SecurityUtils;
import com.example.backend.modules.order.dto.OrderCreateDTO;
import com.example.backend.modules.order.dto.OrderDetailVO;
import com.example.backend.modules.order.dto.OrderQueryDTO;
import com.example.backend.modules.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "订单管理")
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "创建订单")
    @PostMapping
    public Result<String> create(@RequestBody @Valid OrderCreateDTO createDTO) {
        return Result.success(orderService.create(SecurityUtils.getCurrentUserId(), createDTO));
    }

    @Operation(summary = "取消订单")
    @PutMapping("/{orderNo}/cancel")
    public Result<Void> cancel(@Parameter(description = "订单编号") @PathVariable String orderNo) {
        orderService.cancel(SecurityUtils.getCurrentUserId(), orderNo);
        return Result.success();
    }

    @Operation(summary = "支付订单")
    @PutMapping("/{orderNo}/pay")
    public Result<Void> pay(@Parameter(description = "订单编号") @PathVariable String orderNo) {
        orderService.pay(SecurityUtils.getCurrentUserId(), orderNo);
        return Result.success();
    }

    @Operation(summary = "确认收货")
    @PutMapping("/{orderNo}/confirm")
    public Result<Void> confirm(@Parameter(description = "订单编号") @PathVariable String orderNo) {
        orderService.confirm(SecurityUtils.getCurrentUserId(), orderNo);
        return Result.success();
    }

    @Operation(summary = "查询订单详情")
    @GetMapping("/{orderNo}")
    public Result<OrderDetailVO> getDetail(@Parameter(description = "订单编号") @PathVariable String orderNo) {
        return Result.success(orderService.getDetail(SecurityUtils.getCurrentUserId(), orderNo));
    }

    @Operation(summary = "分页查询订单列表")
    @GetMapping
    public Result<PageResult<OrderDetailVO>> list(@Valid OrderQueryDTO queryDTO,
                                        @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
                                        @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(orderService.list(SecurityUtils.getCurrentUserId(), queryDTO, page, size));
    }
} 