
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CameraOff, Info } from 'lucide-react';

export function CameraTest() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setPermissionDenied(false);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      if (err.name === 'NotAllowedError') {
        setPermissionDenied(true);
      } else {
        setError(`Camera error: ${err.message}`);
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Camera className="h-6 w-6" /> Camera Test
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Test your camera functionality and quality
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-md">
              {!isCameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-800">
                  {permissionDenied ? (
                    <div className="text-center p-4">
                      <CameraOff className="h-12 w-12 mx-auto mb-4 text-red-400" />
                      <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        Please allow camera access in your browser settings to use this feature.
                      </p>
                    </div>
                  ) : error ? (
                    <div className="text-center p-4">
                      <CameraOff className="h-12 w-12 mx-auto mb-4 text-red-400" />
                      <h3 className="text-xl font-bold mb-2">Camera Error</h3>
                      <p className="text-gray-400 max-w-md mx-auto">{error}</p>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-bold mb-2">Camera Inactive</h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        Click the button below to start your camera test.
                      </p>
                    </div>
                  )}
                </div>
              )}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center">
              {!isCameraActive ? (
                <Button 
                  onClick={startCamera} 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 px-8 py-6 h-auto"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera
                </Button>
              ) : (
                <Button 
                  onClick={stopCamera} 
                  variant="outline"
                  size="lg"
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-950 shadow-sm hover:shadow transition-all duration-300 px-8 py-6 h-auto"
                >
                  <CameraOff className="mr-2 h-5 w-5" />
                  Stop Camera
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 dark:bg-gray-900 p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <p>
              This test activates your camera to check if it's working properly. Make sure you're in a well-lit environment 
              for the best results. Your camera feed is displayed locally and is not recorded or transmitted.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}