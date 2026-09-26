import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import WavyHeaderNav from "./components/WavyHeaderNav";
import Footer from "./components/Footer";
import BookmarksDrawer from "./components/BookmarksDrawer";
import AiChatbotWidget from "./components/AiChatbotWidget";
import marketsData from "./data/markets.json";
import produceData from "./data/produce.json";

export default function MainLayout() {
  const location = useLocation();
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks state with localStorage persistence
  const [bookmarkedMarketIds, setBookmarkedMarketIds] = useState(() => {
    try {
      const saved = localStorage.getItem("freshfind_market_bookmarks");
      return saved ? JSON.parse(saved) : ["m1", "m2"];
    } catch {
      return ["m1", "m2"];
    }
  });

  const [bookmarkedProduceIds, setBookmarkedProduceIds] = useState(() => {
    try {
      const saved = localStorage.getItem("freshfind_produce_bookmarks");
      return saved ? JSON.parse(saved) : ["p1"];
    } catch {
      return ["p1"];
    }
  });

  useEffect(() => {
    localStorage.setItem("freshfind_market_bookmarks", JSON.stringify(bookmarkedMarketIds));
  }, [bookmarkedMarketIds]);

  useEffect(() => {
    localStorage.setItem("freshfind_produce_bookmarks", JSON.stringify(bookmarkedProduceIds));
  }, [bookmarkedProduceIds]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const handleToggleMarketBookmark = (id) => {
    setBookmarkedMarketIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleToggleProduceBookmark = (id) => {
    setBookmarkedProduceIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const bookmarkedMarketsList = marketsData.filter((m) =>
    bookmarkedMarketIds.includes(m.id)
  );
  const bookmarkedProduceList = produceData.filter((p) =>
    bookmarkedProduceIds.includes(p.id)
  );

  const totalBookmarks = bookmarkedMarketIds.length + bookmarkedProduceIds.length;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Universal Navbar that came with freshfind-main */}
      <WavyHeaderNav
        bookmarkCount={totalBookmarks}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* 2. Main Page Content with Outlet */}
      <main className="flex-1 site-main">
        <Outlet
          context={{
            bookmarkedMarketIds,
            bookmarkedProduceIds,
            handleToggleMarketBookmark,
            handleToggleProduceBookmark,
            onOpenBookmarks: () => setIsBookmarksOpen(true),
          }}
        />
      </main>

      {/* 3. Universal Footer that came with freshfind-main */}
      <Footer />

      {/* 4. Global Floating AI Chatbot Widget */}
      <AiChatbotWidget />

      {/* 5. Global Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedMarkets={bookmarkedMarketsList}
        bookmarkedProduce={bookmarkedProduceList}
        onRemoveMarketBookmark={handleToggleMarketBookmark}
        onRemoveProduceBookmark={handleToggleProduceBookmark}
      />
    </div>
  );
}