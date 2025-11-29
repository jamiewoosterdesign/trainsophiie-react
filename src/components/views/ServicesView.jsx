import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ServicesView({ onOpenWizard }) {
  return (
    <div className="view-section flex flex-col h-full w-full">
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services Configuration</h1>
          <p className="text-slate-500 text-sm mt-1">Teach Sophiie what services you offer and how to handle them.</p>
        </div>
        <Button
          onClick={() => onOpenWizard('service')}
          className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm font-medium gap-2 transition-all active:scale-95"
        >
          <i className="fa-solid fa-plus"></i> Add New Service
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Service Card 1 */}
          <Card className="hover:shadow-md transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1 border-gray-200 shadow-sm">
            <CardHeader className="p-6 pb-2">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <i className="fa-solid fa-faucet text-xl"></i>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-500 hover:bg-gray-100 uppercase tracking-wider text-[10px] font-bold px-2 py-1">Active</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">Emergency Plumbing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 pb-4">
              <p className="text-sm text-slate-500 line-clamp-2">Handling burst pipes, leaks, and overflowing toilets.</p>
            </CardContent>
            <CardFooter className="p-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-slate-400">
              <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> 60 min</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-share-nodes"></i> Transfer</span>
            </CardFooter>
          </Card>

          {/* Service Card 2 */}
          <Card className="hover:shadow-md transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1 border-gray-200 shadow-sm">
            <CardHeader className="p-6 pb-2">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <i className="fa-solid fa-fire-burner text-xl"></i>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-500 hover:bg-gray-100 uppercase tracking-wider text-[10px] font-bold px-2 py-1">Active</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">Gas Fitting</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 pb-4">
              <p className="text-sm text-slate-500 line-clamp-2">Installation and maintenance of gas appliances.</p>
            </CardContent>
            <CardFooter className="p-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-slate-400">
              <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> 90 min</span>
              <span className="flex items-center gap-1"><i className="fa-regular fa-calendar-check"></i> Book</span>
            </CardFooter>
          </Card>

          {/* Add New Placeholder */}
          <button
            onClick={() => onOpenWizard('service')}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50/50 transition-all bg-transparent h-full min-h-[240px]"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-plus text-lg text-brand-500"></i>
            </div>
            <span className="font-medium">Create New Service</span>
          </button>
        </div>
      </div>
    </div>
  );
}
