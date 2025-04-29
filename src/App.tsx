
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpeedTest } from '@/components/SpeedTest';
import { CameraTest } from '@/components/CameraTest';
import { Wifi, Camera, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Wifi className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SpeedCam Tester</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Test your internet speed and camera</p>
              </div>
            </div>
            <div>
              <a 
                href="https://github.com/blink-new/speed-camera-test-app-awtgsild" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="speed" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-blue-50 dark:bg-gray-800">
              <TabsTrigger 
                value="speed" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white py-3"
              >
                <Wifi className="mr-2 h-5 w-5" />
                Speed Test
              </TabsTrigger>
              <TabsTrigger 
                value="camera" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white py-3"
              >
                <Camera className="mr-2 h-5 w-5" />
                Camera Test
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="speed" className="mt-0 animate-slide-up">
            <SpeedTest />
          </TabsContent>
          
          <TabsContent value="camera" className="mt-0 animate-slide-up">
            <CameraTest />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} SpeedCam Tester. All rights reserved.</p>
            <p className="mt-1">This application tests your internet speed and camera functionality.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;