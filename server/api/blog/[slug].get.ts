export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
  }

  const post = getMarkdownBySlug('blog', slug);
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' });
  }

  return post;
});
