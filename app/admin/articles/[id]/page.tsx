import ArticleEditor from '../../ArticleEditor';
import { getArticleById } from '../../lib/mockData';
import { notFound } from 'next/navigation';

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const article = getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialData={article} isEditing={true} />;
}
