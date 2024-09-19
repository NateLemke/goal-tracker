import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/taskContext";

const font = Outfit({ weight: '400',subsets: ["latin"] });

export const metadata = {
  title: "Goal tracker",
  description: "Keep track of goal and task completion",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <body className={font.className}>
          <AuthProvider> 
            <TaskProvider>
              {children}
            </TaskProvider>
          </AuthProvider>
        </body>
      </html>
    
  );
}
