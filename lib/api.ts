export async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/home`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch home data");
  }
  const response = await res.json()
  return response.response_data;
}

export async function getAboutPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/about-us`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch about us page data");
  }
  const response = await res.json()
  return response.response_data;
}

export async function getProjectPageData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/our-projects`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch about project page data");
  }
  const response = await res.json()
  return response.response_data;

}

export async function getEventPageData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/events`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch event page data");
  }
  const response = await res.json()
  return response.response_data;

}

export async function getSiteSettingData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/site-setting`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch site setting data");
  }
  const response = await res.json()
  return response.response_data;

}

export async function WhereWeArePageData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/our-reach`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch page data");
  }
  const response = await res.json()
  return response.response_data;

}

export async function LegalStatusPageData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/legal-status-recognition`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch page data");
  }
  const response = await res.json()
  return response.response_data;

}


export async function ContactUsPageData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/contact-us`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch page data");
  }
  const response = await res.json()
  return response.response_data;

}

export async function BlogPageData() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/blog`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch page data");
  }
  const response = await res.json()
  return response.response_data;

}


export async function EventDetailsPageData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch event data");
  }

  const response = await res.json();
  return response.response_data;
}


export async function ProjectDetailsPageData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/get-projects/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch project data");
  }

  const response = await res.json();
  return response.response_data;
}


export async function BlogDetailsPageData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch blog data");
  }

  const response = await res.json();
  return response.response_data;
}

export async function GetSiteData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/site-setting`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Failed to fetch site data");
  }

  const response = await res.json();
  return response.response_data;
}




