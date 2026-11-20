# chat-bot

Official AI Academic Enquiry & Admissions Chatbot for **Federal College of Animal Health and Production Technology, Vom (FCAHPTVom)**.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and powered by **Groq AI API** for high-speed real-time streaming responses without any database dependencies.

---

## Features

- **Pro-Level Minimalist UI**: Clean, modern aesthetic inspired by Claude 3.5 Sonnet and ChatGPT.
- **Quick Ask Side Navigation**: Collapsible side rail with quick search and categorized frequent questions:
  - Admissions & JAMB UTME Cut-off
  - ND & HND Programmes
  - Fees & Remita Payments
  - HND & Industrial Training (IT) Requirements
  - Campus Hostels & Facilities in Vom
- **Real-Time Streaming**: Instant word-by-word streaming responses powered by Groq AI.
- **Audio & Accessibility**:
  - Voice input (Speech-to-Text via Web Speech API)
  - Audio reader (Text-to-Speech)
- **Zero Database**: Fast, stateless architecture running directly with the Groq SDK.
- **Responsive & Accessible**: Seamlessly adapts from desktop side-rail to mobile drawer.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Engine**: [Groq SDK](https://github.com/groq/groq-typescript) (LLaMA 3.3 70B)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Aboki008/chat-bot.git
cd chat-bot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API Key
Create a `.env.local` file or copy from the example:
```bash
cp .env.local.example .env.local
```
Add your free Groq API key (get one at [console.groq.com/keys](https://console.groq.com/keys)):
```env
GROQ_API_KEY=gsk_your_api_key_here
```
*Note: You can also enter the API key directly in the UI via the Settings icon in the top-right corner.*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## License

This project is open source and available under the [MIT License](LICENSE).
