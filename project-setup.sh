# Create new Next.js project
npx create-next-app@latest speech-assist --typescript --tailwind --eslint

# Navigate to project directory
cd speech-assist

# Install necessary dependencies
npm install @clerk/nextjs @prisma/client react-speech-recognition axios lucide-react
npm install -D prisma @types/react-speech-recognition

# Install UI components
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-toast
