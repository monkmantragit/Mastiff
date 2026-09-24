#!/bin/bash

echo "🚀 Testing Directus Connection..."
echo "=================================="

DIRECTUS_URL="https://directus-production-bc75.up.railway.app"
DIRECTUS_TOKEN="${DIRECTUS_TOKEN:?Set DIRECTUS_TOKEN in your environment}"

echo "📡 Testing connection to: $DIRECTUS_URL"
echo ""

# Test 1: Basic connection
echo "🔍 Test 1: Basic connection"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" "$DIRECTUS_URL"
echo ""

# Test 2: Server info endpoint
echo "🔍 Test 2: Server info endpoint"
curl -s -w "HTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $DIRECTUS_TOKEN" \
  -H "Content-Type: application/json" \
  "$DIRECTUS_URL/server/info"
echo ""

# Test 3: Blog collection
echo "🔍 Test 3: Blog collection"
curl -s -w "HTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $DIRECTUS_TOKEN" \
  -H "Content-Type: application/json" \
  "$DIRECTUS_URL/items/blog"
echo ""

echo "=================================="
echo "💡 Next steps:"
echo "1. If HTTP 000 = Connection timeout/DNS issue"
echo "2. If HTTP 403 = Permission issue"
echo "3. If HTTP 401 = Authentication issue"
echo "4. If HTTP 200 = Connection OK"