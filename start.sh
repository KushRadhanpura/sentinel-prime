#!/bin/bash

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🛡️  SENTINEL PRIME - LAUNCH SEQUENCE 🛡️            ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Colors
GOLD='\033[1;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Kill any existing processes on ports 5000 and 5173
echo -e "${GOLD}[1/4]${NC} Clearing ports..."
lsof -ti:5000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
sleep 1
echo -e "${GREEN}✓${NC} Ports cleared"

# Start Backend
echo ""
echo -e "${GOLD}[2/4]${NC} Launching Backend Server (Port 5000)..."
cd backend && npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
sleep 3
echo -e "${GREEN}✓${NC} Backend running (PID: $BACKEND_PID)"

# Start Frontend
echo ""
echo -e "${GOLD}[3/4]${NC} Launching Frontend (Port 5173)..."
cd ../frontend && npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 3
echo -e "${GREEN}✓${NC} Frontend running (PID: $FRONTEND_PID)"

echo ""
echo -e "${GOLD}[4/4]${NC} System Status Check..."
sleep 2

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  🎯 SENTINEL PRIME IS NOW OPERATIONAL                ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo -e "║  Frontend:  ${GREEN}http://localhost:5173${NC}                    ║"
echo -e "║  Backend:   ${GREEN}https://sentinel-prime-1a28.onrender.com${NC}                    ║"
echo -e "║  API Docs:  ${GREEN}https://sentinel-prime-1a28.onrender.com/api/health${NC}         ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  Logs:                                                ║"
echo "║    Backend:  logs/backend.log                         ║"
echo "║    Frontend: logs/frontend.log                        ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo -e "${GOLD}Press Ctrl+C to stop all servers${NC}"
echo ""

# Wait for user interrupt
trap "echo ''; echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
