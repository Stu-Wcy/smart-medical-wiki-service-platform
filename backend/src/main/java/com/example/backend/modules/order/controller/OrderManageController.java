package com.example.backend.modules.order.controller;

import com.example.backend.common.base.PageResult;
import com.example.backend.common.base.Result;
import com.example.backend.modules.order.dto.OrderDetailVO;
import com.example.backend.modules.order.dto.OrderQueryDTO;
import com.example.backend.modules.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "订单管理(管理员)")
@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class OrderManageController {

    private final OrderService orderService;

    @Operation(summary = "分页查询订单列表")
    @GetMapping
    public Result<PageResult<OrderDetailVO>> list(@Valid OrderQueryDTO queryDTO,
                                        @Parameter(description = "页码") @RequestParam(defaultValue = "1") Integer page,
                                        @Parameter(description = "每页大小") @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(orderService.listForAdmin(queryDTO, page, size));
    }

    @Operation(summary = "发货")
    @PutMapping("/{orderNo}/deliver")
    public Result<Void> deliver(@Parameter(description = "订单编号") @PathVariable String orderNo) {
        orderService.deliver(orderNo);
        return Result.success();
    }
    /**
     * 查询订单详情
     */
    @Operation(summary = "查询订单详情")
    @GetMapping("/{orderNo}")
    public Result<OrderDetailVO> getDetail(@Parameter(description = "订单编号") @PathVariable String orderNo) {
        return Result.success(orderService.getDetail(null, orderNo));
    }
} 