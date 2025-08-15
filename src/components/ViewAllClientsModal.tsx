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

const ITEMS_PER_PAGE = 24;

export function ViewAllClientsModal({ isOpen, onClose }: ViewAllClientsModalProps) {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientLogo[]>([]);
  const [displayedClients, setDisplayedClients] = useState<ClientLogo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch all clients on modal open
  useEffect(() => {
    if (isOpen && clients.length === 0) {
      fetchAllClients();
    }
  }, [isOpen]);

  // Filter clients based on search term
  useEffect(() => {
    const filtered = clients.filter(client =>
      client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
    setPage(1);
    setDisplayedClients(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [clients, searchTerm]);

  const fetchAllClients = async () => {
    setLoading(true);
    try {
      const allClients = await ClientLogosService.getAllClientLogos();
      setClients(allClients);
      setFilteredClients(allClients);
      setDisplayedClients(allClients.slice(0, ITEMS_PER_PAGE));
      setHasMore(allClients.length > ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreClients = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newClients = filteredClients.slice(startIndex, endIndex);
      
      setDisplayedClients(prev => [...prev, ...newClients]);
      setPage(prev => prev + 1);
      setHasMore(endIndex < filteredClients.length);
      setLoadingMore(false);
    }, 500); // Simulate loading delay for better UX
  }, [page, filteredClients, loadingMore, hasMore]);

  // Infinite scroll observer
  const lastClientRef = useCallback((node: HTMLDivElement) => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreClients();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore, loadMoreClients]);

  const handleClose = () => {
    setSearchTerm('');
    setPage(1);
    onClose();
  };

  if (!isOpen) return null;

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
                  Our <span className="text-amber-600">165+ Clients</span>
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
            ) : displayedClients.length === 0 && !loading ? (
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
                <div className="mb-6">
                  <p className="text-sm text-neutral-600 font-body">
                    Showing {displayedClients.length} of {filteredClients.length} clients
                    {searchTerm && ` matching "${searchTerm}"`}
                  </p>
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                  {displayedClients.map((client, index) => {
                    const isLast = index === displayedClients.length - 1;
                    return (
                      <motion.div
                        key={client.id}
                        ref={isLast ? lastClientRef : undefined}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: (index % ITEMS_PER_PAGE) * 0.02 
                        }}
                        className="group"
                      >
                        <div className="bg-neutral-50 rounded-xl p-4 lg:p-6 aspect-[4/3] flex items-center justify-center hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-105 border border-transparent hover:border-amber-200">
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
                          <div className="flex items-center justify-center text-xs font-medium text-neutral-400 text-center font-body">
                            {client.client_name}
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <p className="text-xs font-medium text-neutral-700 font-body truncate">
                            {client.client_name}
                          </p>
                          <p className="text-xs text-amber-600 font-body mt-1">
                            {client.Category}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Loading More Indicator */}
                {loadingMore && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-amber-500 animate-spin mr-2" />
                    <span className="text-neutral-600 font-body">Loading more clients...</span>
                  </div>
                )}

                {/* End of Results */}
                {!hasMore && displayedClients.length > 0 && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
                      <span className="text-sm text-amber-700 font-body">
                        You've seen all {filteredClients.length} clients
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 p-6 lg:p-8 border-t border-neutral-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-neutral-600 text-sm font-body">
                {searchTerm && (
                  <>
                    <span className="text-amber-600 font-medium">{filteredClients.length}</span> results found
                  </>
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