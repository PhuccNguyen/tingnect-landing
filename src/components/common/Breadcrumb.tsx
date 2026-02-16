import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://tingnect.com${item.href}` : undefined,
    })).filter(item => item.item !== undefined),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />
      <nav aria-label="breadcrumb" className={styles.breadcrumb}>
        <div className={styles.container}>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              {item.href ? (
                <>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                  {index < items.length - 1 && (
                    <ChevronRight size={16} className={styles.separator} />
                  )}
                </>
              ) : (
                <>
                  <span className={styles.current}>{item.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
