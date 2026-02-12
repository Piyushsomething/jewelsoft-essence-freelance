import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, X } from 'lucide-react';

const CATALOGUE_PATH = '/Catalogue 2026.pdf';

const CatalogueDownload = () => {
    const [showViewer, setShowViewer] = useState(false);

    return (
        <>
            <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full translate-x-1/3 translate-y-1/3" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-yellow-400 font-medium tracking-widest uppercase text-xs sm:text-sm mb-3">
                            Explore Our Collection
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Catalogue 2026
                        </h2>
                        <div className="w-16 h-0.5 bg-yellow-500 mx-auto mb-6" />
                        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10">
                            Browse our complete collection of exquisite handcrafted jewelry. View the catalogue online or download it to explore at your convenience.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button
                                onClick={() => setShowViewer(true)}
                                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/20 transition-all w-full sm:w-auto justify-center"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Eye className="w-5 h-5" />
                                View Online
                            </motion.button>

                            <motion.a
                                href={CATALOGUE_PATH}
                                download="Parshav_Exports_Catalogue_2026.pdf"
                                className="flex items-center gap-3 bg-yellow-500 text-black px-8 py-3.5 rounded-lg font-medium hover:bg-yellow-400 transition-all w-full sm:w-auto justify-center shadow-lg shadow-yellow-500/20"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Download className="w-5 h-5" />
                                Download PDF
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Fullscreen PDF Viewer Modal */}
            {showViewer && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div
                        className="relative w-full max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-900 text-white">
                            <h3 className="font-medium text-sm sm:text-base">Parshav Exports — Catalogue 2026</h3>
                            <div className="flex items-center gap-3">
                                <a
                                    href={CATALOGUE_PATH}
                                    download="Parshav_Exports_Catalogue_2026.pdf"
                                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">Download</span>
                                </a>
                                <button
                                    onClick={() => setShowViewer(false)}
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        {/* PDF Embed */}
                        <iframe
                            src={CATALOGUE_PATH}
                            className="w-full h-[calc(100%-52px)]"
                            title="Parshav Exports Catalogue 2026"
                        />
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default CatalogueDownload;
