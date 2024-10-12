import {
      CopilotRuntime,
      GoogleGenerativeAIAdapter,
      copilotRuntimeNextJSAppRouterEndpoint,
    } from '@copilotkit/runtime';
    
    import { NextRequest } from 'next/server';
    import { GoogleGenerativeAI } from '@google/generative-ai';
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

    
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro', // Specify the model as "gemini-pro"
    });
    
    const serviceAdapter = new GoogleGenerativeAIAdapter({ model });
    
    const runtime = new CopilotRuntime();
    
    export const POST = async (req: NextRequest) => {
      const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: '/api/copilotkit', // Your desired endpoint
      });
    
      return handleRequest(req);
    };
    