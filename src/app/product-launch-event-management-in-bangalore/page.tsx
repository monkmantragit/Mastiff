import { Metadata } from 'next';
import ProductLaunchEventClient from './product-launch-event-management-in-bangalore';

export const metadata: Metadata = {
    title: 'Product Launch Events Bangalore | White Massif',
    description: 'Expert product launch event management in Bangalore. Full-service planning and high-impact production for new products, brands or facilities. Enquire now.',
    alternates: {
        canonical: 'https://whitemassif.com/product-launch-event-management-in-bangalore'
    }
};

export default function ProductLaunchEvent() {
    return <ProductLaunchEventClient />;
}
