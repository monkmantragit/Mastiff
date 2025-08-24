'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ClientLogosService, type ClientLogo } from '@/lib/client-logos-service';
import { X, Search, Loader2, Users } from 'lucide-react';

interface ViewAllClientsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroupedClients {
  [industry: string]: ClientLogo[];
}

const ITEMS_PER_INDUSTRY = 12;

export function ViewAllClientsModal({ isOpen, onClose }: ViewAllClientsModalProps) {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [groupedClients, setGroupedClients] = useState<GroupedClients>({});
  const [displayedGroups, setDisplayedGroups] = useState<GroupedClients>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState<{ [industry: string]: number }>({});
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch all clients on modal open
  useEffect(() => {
    if (isOpen && clients.length === 0) {
      fetchAllClients();
    }
  }, [isOpen]);

  // Group clients by industry and handle search
  useEffect(() => {
    const filtered = clients.filter(client =>
      client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grouped = filtered.reduce((acc: GroupedClients, client) => {
      const industry = client.Category || 'Other';
      if (!acc[industry]) {
        acc[industry] = [];
      }
      acc[industry].push(client);
      return acc;
    }, {});

    // Sort industries alphabetically
    const sortedGrouped: GroupedClients = {};
    Object.keys(grouped).sort().forEach(key => {
      sortedGrouped[key] = grouped[key];
    });

    setGroupedClients(sortedGrouped);
    
    // Initialize displayed groups with first batch
    const initialDisplayed: GroupedClients = {};
    const initialCounts: { [industry: string]: number } = {};
    
    Object.keys(sortedGrouped).forEach(industry => {
      initialDisplayed[industry] = sortedGrouped[industry].slice(0, ITEMS_PER_INDUSTRY);
      initialCounts[industry] = Math.min(ITEMS_PER_INDUSTRY, sortedGrouped[industry].length);
    });
    
    setDisplayedGroups(initialDisplayed);
    setVisibleCount(initialCounts);
  }, [clients, searchTerm]);

  const fetchAllClients = async () => {
    setLoading(true);
    try {
      const allClients = await ClientLogosService.getAllClientLogos();
      setClients(allClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreForIndustry = useCallback((industry: string) => {
    if (loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentCount = visibleCount[industry] || 0;
      const newCount = Math.min(currentCount + ITEMS_PER_INDUSTRY, groupedClients[industry].length);
      
      setDisplayedGroups(prev => ({
        ...prev,
        [industry]: groupedClients[industry].slice(0, newCount)
      }));
      
      setVisibleCount(prev => ({
        ...prev,
        [industry]: newCount
      }));
      
      setLoadingMore(false);
    }, 300);
  }, [groupedClients, visibleCount, loadingMore]);

  // Infinite scroll observer for each industry
  const createIndustryRef = useCallback((industry: string) => (node: HTMLDivElement) => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    const hasMore = (visibleCount[industry] || 0) < (groupedClients[industry]?.length || 0);
    if (!hasMore) return;
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreForIndustry(industry);
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, visibleCount, groupedClients, loadMoreForIndustry]);

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  const totalClients = Object.values(groupedClients).reduce((sum, clients) => sum + clients.length, 0);
  const totalDisplayed = Object.values(displayedGroups).reduce((sum, clients) => sum + clients.length, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10 p-6 lg:p-8 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-amber-50/30 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-display text-neutral-900 mb-2">
                  Our <span className="text-amber-600">175+ Clients</span>
                </h2>
                <p className="text-neutral-600 font-body">
                  Industry leaders who trust White Massif with their most important events
                </p>
              </div>
              <Button
                onClick={handleClose}
                variant="outline"
                size="sm"
                className="rounded-full p-2 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Search Controls */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients or industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-body text-sm"
              />
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-4" />
                <p className="text-neutral-600 font-body">Loading all clients...</p>
              </div>
            ) : Object.keys(displayedGroups).length === 0 && !loading ? (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-display text-neutral-600 mb-2">
                  {searchTerm ? 'No clients found' : 'No clients available'}
                </h3>
                <p className="text-neutral-500 font-body">
                  {searchTerm ? 'Try adjusting your search criteria' : 'Please check back later'}
                </p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-8">
                  <p className="text-sm text-neutral-600 font-body">
                    Showing {totalDisplayed} of {totalClients} clients across {Object.keys(groupedClients).length} industries
                    {searchTerm && ` matching "${searchTerm}"`}
                  </p>
                </div>

                {/* Industry Groups */}
                <div className="space-y-10">
                  {Object.entries(displayedGroups).map(([industry, clients]) => (
                    <motion.div
                      key={industry}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Industry Header */}
                      <div className="flex items-center mb-6">
                        <h3 className="text-lg lg:text-xl font-display text-neutral-800 mr-4">
                          {industry}
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent"></div>
                        <span className="ml-4 text-sm text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
                          {groupedClients[industry]?.length || 0} clients
                        </span>
                      </div>

                      {/* Clients Grid for this Industry */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 lg:gap-6">
                        {clients.map((client, index) => {
                          const isLastInIndustry = index === clients.length - 1;
                          const hasMoreInIndustry = (visibleCount[industry] || 0) < (groupedClients[industry]?.length || 0);
                          
                          return (
                            <motion.div
                              key={client.id}
                              ref={isLastInIndustry && hasMoreInIndustry ? createIndustryRef(industry) : undefined}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: index * 0.05 
                              }}
                              className="group"
                            >
                              <div className="bg-neutral-50 rounded-lg p-3 lg:p-4 aspect-square flex items-center justify-center hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-105 border border-transparent hover:border-amber-200">
                                {ClientLogosService.getBestLogoUrl(client) ? (
                                  <img
                                    src={ClientLogosService.getBestLogoUrl(client) || ''}
                                    alt={client.client_name}
                                    className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                  />
                                ) : null}
                                <div className="hidden flex items-center justify-center text-xs font-medium text-neutral-400 text-center font-body">
                                  {client.client_name}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Load More for this Industry */}
                      {(visibleCount[industry] || 0) < (groupedClients[industry]?.length || 0) && (
                        <div className="text-center mt-6">
                          <Button
                            onClick={() => loadMoreForIndustry(industry)}
                            variant="outline"
                            size="sm"
                            disabled={loadingMore}
                            className="text-amber-600 border-amber-300 hover:bg-amber-50 hover:border-amber-400"
                          >
                            {loadingMore ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Loading...
                              </>
                            ) : (
                              `Load More ${industry} (${(groupedClients[industry]?.length || 0) - (visibleCount[industry] || 0)} remaining)`
                            )}
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 p-6 lg:p-8 border-t border-neutral-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-neutral-600 text-sm font-body">
                {searchTerm ? (
                  <>
                    <span className="text-amber-600 font-medium">{totalClients}</span> results found across {Object.keys(groupedClients).length} industries
                  </>
                ) : (
                  `${totalClients} clients across ${Object.keys(groupedClients).length} industries`
                )}
              </p>
              <div className="flex gap-3">
                {searchTerm && (
                  <Button
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    size="sm"
                    className="text-neutral-600 border-neutral-300 hover:border-amber-400 hover:text-amber-600"
                  >
                    Clear Search
                  </Button>
                )}
                <Button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-6 transition-all duration-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}