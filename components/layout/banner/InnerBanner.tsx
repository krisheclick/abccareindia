import { useGlobalContext } from '@/context/global_context';
import Styles from './style.module.css';
import Link from 'next/link';
import { Container, Stack } from 'react-bootstrap';
import Image from 'next/image';

interface BreadcrumbItem {
    breadcrumb_item?: string;
    breadcrumb_slug?: string;
}

interface InnerBannerProps {
    breadcrumb?: BreadcrumbItem[] | null;
}

const InnerBanner = ({ breadcrumb }: InnerBannerProps) => {
    const { hasLoading, mediaUrl, innerBanner,} = useGlobalContext();
    const title = innerBanner?.page_name ?? '';
    const words = title.trim().split(/\s+/);
    const lastWord = words.pop();
    const firstPart = words.join(' ');

    return (
        <div className={Styles.innerbanner_sec}>
            {!hasLoading ? (
                <Stack as="figure" className={Styles.inerbnrimg}>
                    <Image
                        src={`${mediaUrl}${innerBanner?.page_feature_image}`}
                        alt={innerBanner?.page_name || "Inner-Banner"}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src= `/assets/images/innerbanner.webp`
                        }}
                        fill
                        style={{objectFit: "cover"}}
                    />
                </Stack>

            ) : (
                <div className="skeleton skeletonFill"></div>
            )}
            <div className={Styles.innerbannertxtbx}>
                <Container>
                    <div className={Styles.inrbnrhead}>
                        {firstPart}{' '}
                        {lastWord && <span>{lastWord}</span>}
                    </div>
                    <ul className={`d-flex align-items-center ${Styles.brdcminr}`}>
                        <li><Link href="/">Home</Link></li>
                        {breadcrumb && breadcrumb?.length > 0 && (
                            breadcrumb.map((value, index) => (
                                <li key={index}><Link href={value?.breadcrumb_slug || ''}>{value.breadcrumb_item}</Link></li>
                            ))
                        )}
                        <li>{innerBanner?.page_name}</li>
                    </ul>
                </Container>
            </div>
        </div>
    )
}

export default InnerBanner
