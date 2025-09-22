
import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

const PRODUCTS: Product[] = [
  {
    key: 'trendpulse',
    name: 'TrendPulse',
    description: 'Analyze real-time market trends and viral content for your niche.',
    fields: [
      { type: 'text', name: 'topic', label: 'Main Topic/Keyword', required: true },
      { type: 'select', name: 'platform', label: 'Platform', options: ['Instagram', 'TikTok', 'YouTube', 'Blog'], required: true },
    ]
  },
  {
    key: 'contentforge',
    name: 'ContentForge',
    description: 'Generate high-quality articles, blog posts, and scripts in seconds.',
    fields: [
      { type: 'textarea', name: 'prompt', label: 'Describe the content you want', required: true },
      { type: 'select', name: 'tone', label: 'Tone of Voice', options: ['Professional', 'Casual', 'Witty', 'Informative'], required: true },
    ]
  },
  {
    key: 'ai_critic',
    name: 'AI Critic',
    description: 'Get instant feedback and improvement suggestions on your existing content.',
    fields: [
        { type: 'textarea', name: 'content', label: 'Paste your content here', required: true },
        { type: 'select', name: 'goal', label: 'Primary Goal', options: ['Improve Readability', 'Boost SEO', 'Increase Engagement'], required: true },
    ]
  },
  {
    key: 'engagemax',
    name: 'EngageMax',
    description: 'Create engaging social media captions, comments, and replies.',
    fields: [
        { type: 'text', name: 'post_topic', label: 'Topic of the post', required: true },
        { type: 'select', name: 'post_type', label: 'Type of post', options: ['Question', 'Announcement', 'Poll', 'Tip'], required: true },
    ]
  },
  {
    key: 'adgenius',
    name: 'AdGenius',
    description: 'Craft compelling ad copy for various platforms to boost conversions.',
    fields: [
        { type: 'text', name: 'product_name', label: 'Product/Service Name', required: true },
        { type: 'textarea', name: 'product_description', label: 'Brief Description', required: true },
    ]
  },
  {
    key: 'growthhacker',
    name: 'GrowthHacker',
    description: 'Discover untapped growth strategies and marketing ideas for your brand.',
    fields: [
        { type: 'text', name: 'industry', label: 'Your Industry/Niche', required: true },
    ]
  },
  {
    key: 'ai_avatar',
    name: 'AI Avatar',
    description: 'Generate unique, AI-powered avatars and profile pictures.',
    fields: [
        { type: 'text', name: 'style', label: 'Describe the desired style (e.g., cyberpunk, fantasy, minimalist)', required: true },
    ]
  },
  {
    key: 'monetizemind',
    name: 'MonetizeMind',
    description: 'Brainstorm monetization strategies tailored to your audience and content.',
    fields: [
        { type: 'text', name: 'audience_description', label: 'Describe your target audience', required: true },
    ]
  },
  {
    key: 'clipsync',
    name: 'ClipSync',
    description: 'Convert long-form videos or articles into short, viral-worthy clips.',
    fields: [
        { type: 'textarea', name: 'source_content', label: 'Paste article text or video transcript', required: true },
    ]
  },
  {
    key: 'scriptforge',
    name: 'ScriptForge',
    description: 'Write engaging scripts for your YouTube videos, TikToks, and Reels.',
    fields: [
        { type: 'text', name: 'video_title', label: 'Video Title or Idea', required: true },
        { type: 'text', name: 'video_length', label: 'Desired Length (e.g., 30 seconds, 5 minutes)', required: true },
    ]
  },
  {
    key: 'stories_converter',
    name: 'Stories Converter',
    description: 'Repurpose your best content into compelling Instagram/Facebook Stories.',
    fields: [
        { type: 'textarea', name: 'original_content', label: 'Paste the content to repurpose', required: true },
    ]
  },
  {
    key: 'brand_voice',
    name: 'Brand Voice',
    description: 'Define and maintain a consistent brand voice across all your content.',
    fields: [
        { type: 'textarea', name: 'brand_values', label: 'Describe your brand values and mission', required: true },
    ]
  },
];


@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  products = signal<Product[]>(PRODUCTS);
}
