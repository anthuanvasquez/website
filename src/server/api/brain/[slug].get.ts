export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
  }

  const note = getMarkdownBySlug('brain', slug);
  if (!note) {
    throw createError({ statusCode: 404, statusMessage: 'Note not found' });
  }

  return note;
});
