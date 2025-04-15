import { useState } from 'react';
import { FiMessageSquare, FiThumbsUp, FiMessageCircle, FiClock } from 'react-icons/fi';
import { GlowOnHover } from '../components/ui/GlowOnHover';
import GlitchText from '../components/GlitchText';

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const posts = [
    {
      id: 1,
      title: 'How to identify sophisticated phishing attempts?',
      content: 'Recently encountered a very convincing phishing email. Here are some tips to spot similar attempts...',
      author: 'SecurityPro',
      likes: 42,
      comments: 15,
      timeAgo: '2 hours ago',
      tags: ['tips', 'email-security']
    },
    {
      id: 2,
      title: 'Best practices for team security training',
      content: 'Looking for advice on implementing security awareness training for a team of 50...',
      author: 'TeamLead123',
      likes: 38,
      comments: 23,
      timeAgo: '5 hours ago',
      tags: ['training', 'teams']
    },
    {
      id: 3,
      title: 'New phishing technique targeting mobile users',
      content: 'Warning: There\'s a new wave of SMS phishing attacks. Here\'s what to look out for...',
      author: 'CyberAlert',
      likes: 56,
      comments: 31,
      timeAgo: '1 day ago',
      tags: ['mobile', 'alerts']
    }
  ];

  const tabs = [
    { id: 'trending', label: 'Trending' },
    { id: 'recent', label: 'Recent' },
    { id: 'top', label: 'Top' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <GlitchText className="text-4xl font-bold mb-4">
            Community Forum
          </GlitchText>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join the discussion with fellow security enthusiasts. Share experiences, ask questions, and learn from the community.
          </p>
        </div>

        {/* Create Post Button */}
        <div className="mb-8">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
            Create New Post
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <GlowOnHover key={post.id}>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.content}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-6">
                      <div className="flex items-center">
                        <FiThumbsUp className="mr-2" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <FiMessageCircle className="mr-2" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-2" />
                        <span>{post.timeAgo}</span>
                      </div>
                      <span className="text-gray-400">by {post.author}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlowOnHover>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community; 