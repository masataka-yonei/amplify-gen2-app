'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import styles from './page.module.css';


const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerUIPage() {
  return (
    <div className={styles.swaggerContainer}>
      <h1>Invoices API Documentation</h1>
      <SwaggerUI url="/swagger.json" />
    </div>
  );
}
