#!/bin/bash

# VideoFly API 测试脚本
# 用于快速测试关键 API 端点

echo "================================"
echo "VideoFly API 测试"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

echo -e "${BLUE}测试目标：${NC}"
echo "1. 开发服务器是否运行"
echo "2. API 端点是否可访问"
echo "3. 返回数据是否正确"
echo ""

# 检查服务器
echo -e "${BLUE}1. 检查开发服务器${NC}"
echo "--------------------------------"
if curl -s -f "$BASE_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 开发服务器运行中${NC}"
else
    echo -e "${RED}✗ 开发服务器未运行${NC}"
    echo "请先运行: pnpm dev"
    exit 1
fi
echo ""

# 测试模型配置 API
echo -e "${BLUE}2. 测试模型配置 API${NC}"
echo "--------------------------------"
echo "GET /api/v1/config/models"
response=$(curl -s "$BASE_URL/api/v1/config/models")
if echo "$response" | grep -q "sora-2"; then
    echo -e "${GREEN}✓ API 正常${NC}"

    # 统计模型数量
    model_count=$(echo "$response" | grep -o '"id"' | wc -l)
    echo -e "${GREEN}✓ 可用模型: $model_count 个${NC}"

    # 显示模型列表
    echo ""
    echo "可用模型："
    echo "$response" | grep -o '"id":"[^"]*"' | sed 's/"id":"//g' | sed 's/"//g' | while read model; do
        echo "  - $model"
    done
else
    echo -e "${RED}✗ API 失败${NC}"
    echo "响应: $response"
fi
echo ""

# 测试认证端点
echo -e "${BLUE}3. 测试认证端点${NC}"
echo "--------------------------------"
echo "GET /api/auth/session (未登录)"
response=$(curl -s -i "$BASE_URL/api/auth/session" 2>&1 | head -20)
if echo "$response" | grep -q "401\|Unauthorized"; then
    echo -e "${GREEN}✓ 认证端点正常（未登录）${NC}"
else
    echo -e "${YELLOW}⚠ 响应异常${NC}"
fi
echo ""

# 测试用户信息 API（未登录）
echo -e "${BLUE}4. 测试用户信息 API（未登录）${NC}"
echo "--------------------------------"
echo "GET /api/v1/user/me"
response=$(curl -s "$BASE_URL/api/v1/user/me")
if echo "$response" | grep -q "UNAUTHORIZED\|unauthorized"; then
    echo -e "${GREEN}✓ API 正常（需要登录）${NC}"
else
    echo -e "${YELLOW}⚠ 意外响应${NC}: $response"
fi
echo ""

# 测试积分余额 API（未登录）
echo -e "${BLUE}5. 测试积分余额 API（未登录）${NC}"
echo "--------------------------------"
echo "GET /api/v1/credit/balance"
response=$(curl -s "$BASE_URL/api/v1/credit/balance")
if echo "$response" | grep -q "UNAUTHORIZED\|unauthorized"; then
    echo -e "${GREEN}✓ API 正常（需要登录）${NC}"
else
    echo -e "${YELLOW}⚠ 意外响应${NC}: $response"
fi
echo ""

# 显示登录提示
echo -e "${BLUE}6. 登录测试${NC}"
echo "--------------------------------"
echo "请在浏览器中完成以下步骤："
echo ""
echo "1. 访问: $BASE_URL"
echo "2. 点击 'Sign In' 按钮"
echo "3. 选择 Google OAuth 或 Magic Link"
echo "4. 完成登录"
echo ""
echo "登录后，运行以下命令测试："
echo ""
echo -e "${YELLOW}# 获取用户信息${NC}"
echo "curl $BASE_URL/api/v1/user/me"
echo ""
echo -e "${YELLOW}# 获取积分余额${NC}"
echo "curl $BASE_URL/api/v1/credit/balance"
echo ""
echo -e "${YELLOW}# 获取交易历史${NC}"
echo "curl $BASE_URL/api/v1/credit/history"
echo ""

echo "================================"
echo "API 测试完成"
echo "================================"
echo ""
echo "📚 相关文档："
echo "  - scripts/test-registration.md (注册流程测试)"
echo "  - TESTING_GUIDE.md (完整测试指南)"
echo "  - QUICKSTART.md (快速开始)"
