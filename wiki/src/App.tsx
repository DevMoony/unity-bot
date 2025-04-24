import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout/Layout";
import GettingStarted from "@/components/sections/GettingStarted";
import Commands from "@/components/sections/Commands";
import Features from "@/components/sections/Features";
import Modules from "@/components/sections/Modules";
import Support from "@/components/sections/Support";
import NotFound from "@/pages/not-found";
import { SidebarProvider } from "@/hooks/use-sidebar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={GettingStarted} />
      <Route path="/commands" component={Commands} />
      <Route path="/features" component={Features} />
      <Route path="/modules" component={Modules} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Layout>
          <Router />
        </Layout>
      </SidebarProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
