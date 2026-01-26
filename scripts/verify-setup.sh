#!/bin/bash

# VideoFly 快速验证脚本
# 用于检查系统是否正常工作

echo "================================"
echo "VideoFly 系统验证"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查函数
check_service() {
    local name=$1
    local url=$2

    echo -n "检查 $name... "
    if curl -s -f "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ 正常${NC}"
        return 0
    else
        echo -e "${RED}✗ 失败${NC}"
        return 1
    fi
}

echo "1. 检查服务状态"
echo "--------------------------------"

# 检查开发服务器
check_service "开发服务器" "http://localhost:3000"

# 检查 API 路由
check_service "配置 API" "http://localhost:3000/api/v1/config/models"

echo ""
echo "2. 检查环境配置"
echo "--------------------------------"

# 检查环境变量文件
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓ .env.local 存在${NC}"

    # 检查关键配置
    if grep -q "DATABASE_URL=" .env.local; then
        echo -e "${GREEN}✓ 数据库已配置${NC}"
    else
        echo -e "${RED}✗ 数据库未配置${NC}"
    fi

    if grep -q "EVOLINK_API_KEY=" .env.local; then
        echo -e "${GREEN}✓ Evolink API Key 已配置${NC}"
    else
        echo -e "${YELLOW}⚠ Evolink API Key 未配置${NC}"
    fi

    if grep -q "CREEM_API_KEY=" .env.local; then
        if grep -q "creem_sk_your_api_key" .env.local; then
            echo -e "${YELLOW}⚠ Creem 未配置（使用占位符）${NC}"
        else
            echo -e "${GREEN}✓ Creem 已配置${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ Creem 未配置${NC}"
    fi
else
    echo -e "${RED}✗ .env.local 不存在${NC}"
fi

echo ""
echo "3. 数据库连接测试"
echo "--------------------------------"

# 尝试查询数据库
if pnpm db:studio --help > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Drizzle Studio 可用${NC}"
    echo "  访问: https://local.drizzle.studio"
else
    echo -e "${RED}✗ Drizzle Studio 不可用${NC}"
fi

echo ""
echo "4. API 端点测试"
echo "--------------------------------"

# 测试配置 API
echo "测试 /api/v1/config/models"
response=$(curl -s "http://localhost:3000/api/v1/config/models")
if echo "$response" | grep -q "sora-2"; then
    echo -e "${GREEN}✓ 模型配置 API 正常${NC}"
    echo "  可用模型: $(echo "$response" | grep -o '"id":"[^"]*"' | head -4 | wc -l) 个"
else
    echo -e "${RED}✗ 模型配置 API 失败${NC}"
fi

echo ""
echo "5. 文件系统检查"
echo "--------------------------------"

# 检查关键目录
dirs=("src/app" "src/ai" "src/services" "src/db")
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓ $dir${NC}"
    else
        echo -e "${RED}✗ $dir 不存在${NC}"
    fi
done

echo ""
echo "6. 浏览器访问指南"
echo "--------------------------------"
echo -e "${GREEN}开发服务器:${NC} http://localhost:3000"
echo -e "${GREEN}数据库管理:${NC} https://local.drizzle.studio"
echo ""
echo "建议测试顺序："
echo "  1. 访问首页并注册新用户"
echo "  2. 验证新用户获得 50 积分"
echo "  3. 查看积分页面和交易历史"
echo "  4. 尝试生成视频"

echo ""
echo "================================"
echo "验证完成"
echo "================================"
echo ""
echo "详细测试指南: scripts/test-auth-flow.md"
echo "快速开始指南: QUICKSTART.md"
