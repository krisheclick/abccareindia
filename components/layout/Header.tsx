// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// interface HeaderProps {
//   page_name?: string;
//   page_slug?: string;
//   page_feature_image?: string | null;
// } 

// const Header = ({
//   page_name,
//   page_slug,
//   page_feature_image,
// }: HeaderProps) => {
//   return (
//     <>

//       <header style={styles.header}>
//         <div style={styles.logo}>MyWebsite</div>

//         <nav>
//           <Link href="/" style={styles.link}>Home</Link>
//           <Link href="/about-us" style={styles.link}>About Us</Link>
//           <Link href="/legal-status" style={styles.link}>Legal Status</Link>
//           <Link href="/our-project" style={styles.link}>Projects</Link>
//           <Link href="/event" style={styles.link}>Events</Link>
//           <Link href="/contact-us" style={styles.link}>Contact Us</Link>
//         </nav>
//       </header>


//       {page_name && (
//         <section style={styles.pageHeader}>
//           {page_feature_image && (
//             <div style={styles.imageWrapper}>
//               <Image
//                 src={page_feature_image}
//                 alt={page_name}
//                 fill
//                 priority
//                 style={{ objectFit: 'cover' }}
//               />
//             </div>
//           )}

//           <div style={styles.overlay}>
//             <h1 style={styles.pageTitle}>{page_name}</h1>

//             {page_slug && (
//               <div style={styles.breadcrumb}>
//                 <span>Home</span>
//                 <span style={styles.separator}>/</span>
//                 <span>{page_name}</span>
//               </div>
//             )}
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// const styles = {

//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '15px 40px',
//     background: '#111',
//     color: '#fff',
//   },
//   logo: {
//     fontSize: '22px',
//     fontWeight: 'bold',
//   },
//   link: {
//     marginLeft: '20px',
//     color: '#fff',
//     textDecoration: 'none',
//   },


//   pageHeader: {
//     position: 'relative' as const,
//     height: '300px',
//     width: '100%',
//   },
//   imageWrapper: {
//     position: 'absolute' as const,
//     inset: 0,
//   },
//   overlay: {
//     position: 'relative' as const,
//     zIndex: 2,
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column' as const,
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'rgba(0,0,0,0.55)',
//     color: '#fff',
//     textAlign: 'center' as const,
//   },
//   pageTitle: {
//     fontSize: '40px',
//     fontWeight: 'bold',
//     marginBottom: '10px',
//   },
//   breadcrumb: {
//     fontSize: '14px',
//     opacity: 0.9,
//   },
//   separator: {
//     margin: '0 8px',
//   },
// };

// export default Header;




// "use client";

// import Link from "next/link";

// export default function Header() {
//   return (
//     <header>
//       <nav>
//         <Link href="/">Home</Link>
//       </nav>
//     </header>
//   );
// }

import Image from 'next/image';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global_context';
import { useEffect, useState } from 'react';
import Social from './Social';
import './style.css';

interface MenuItem {
    url?: string;
    label?: string;
}

const Header = () => {
    const appLink = process.env.NEXT_PUBLIC_ENV_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const {setHasLoading, setMediaUrl, mediaUrl, setCommonData, commonData} = useGlobalContext();
    const [menuData, setMenuData] = useState<MenuItem[] | null>(null);
    const fetchData = async() => {
        try{
            setHasLoading(true);
            const response = await fetch(`${apiUrl}/site-setting`, {cache: "no-cache"});
            const {response_data} = await response.json();
            setCommonData(response_data?.filteredSettings ?? null);
            setMediaUrl(`${process.env.NEXT_PUBLIC_MEDIA_URL}`);

            // Menus
            const menuResponse = await fetch(`${apiUrl}/menu/e3d5ab2ac0ed686cef5a`, {cache: "no-cache"});
            const {response_data: menuData} = await menuResponse.json();
            setMenuData(Object.values(menuData ?? {}));

        }catch(err: unknown){
            console.log('Site Settings api is something: ', (err as Error).message)
        }finally{
            setHasLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="thm_both">
            <div className="top_header">
                <div className="container">
                    <div className="top_header_ds d-flex align-items-center justify-content-between">
                        <div className="top_header_donate"
                            dangerouslySetInnerHTML={{__html: commonData?.site_header_title ?? ''}}
                        />
                        <Social className='top_header_social' />
                    </div>
                </div>
            </div>
            <div className="top_menulogo">
                <div className="container">
                    <div className="tmlbox d-flex align-items-center justify-content-between">
                        <Link href={`${appLink}`} className="headerlgoo">
                            <Image
                                src={`${mediaUrl}${commonData?.site_logo}`}
                                alt="ABC India Logo"
                                width={218} height={84}
                            />
                        </Link>
                        {menuData && menuData?.length > 0 && (
                            <ul className="menuheader d-flex align-items-center">
                                {menuData.map((item, index) => {
                                    return(
                                        <li key={index}>
                                            <Link href={`${appLink}${item.url?.startsWith("/") ? item.url : `/${item.url}`}`}>{item.label}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

