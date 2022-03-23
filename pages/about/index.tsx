import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AboutHeader from '../../components/AboutHeader';
import MemberCard from '../../components/MemberCard';
import MemberCards from '../../components/MemberCards';
import { RequestHelper } from '../../lib/request-helper';

/**
 * The About page.
 *
 * This page contains some introduction about the hackathon in question. It also includes a section used
 * to introduce the team responsible for organizing the hackathon
 *
 * Route: /about
 */
export default function AboutPage({ fetchedMembers }: { fetchedMembers: TeamMember[] }) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    setMembers(fetchedMembers.sort((a, b) => (a.rank > b.rank ? 1 : -1)));
    setLoading(false);
  }, [fetchedMembers]);

  const colorSchemes: ColorScheme[] = [
    {
      light: '#F2F3FF',
      dark: '#C1C8FF',
    },
    {
      light: '#D8F8FF',
      dark: '#B0F1FF',
    },
    {
      dark: '#FCD7FF',
      light: '#FDECFF',
    },
  ];

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow bg-white">
      <Head>
        <title>HackPortal - About</title>
        <meta name="description" content="HackPortal's About Page" />
      </Head>
      <AboutHeader active="/about" />
      <div className="top-6 p-4 flex flex-col gap-y-3">
        <h4 className="font-bold text-3xl">About this hackathon</h4>
        <p>
          UTD&apos;s women-driven tech organizations are excited to join forces and present our
          first all women, non-binary, 24-hour hackathon. Our goal is to create an inclusive
          environment that highlights and empowers women and non-binary students through technology.
          We aim to encourage more underrepresented people to harness their skills to create
          projects of their own.
        </p>
        <p>
          Happening from April 2nd-3rd (2022), we&apos;re planning on hosting the second iteration
          of WEHack in-person for the first time! Join us for some amazing workshops, free food, and
          swag!
        </p>
        <p>We hope to see you for a great hacking experience!</p>
      </div>

      <div className="my-2">
        <h4 className="font-bold text-3xl p-6">Meet Our Team :)</h4>
        <div className="flex flex-wrap justify-center md:px-2">
          {members.map(({ name, description, linkedin, github, personalSite, fileName }, idx) => (
            <MemberCards
              key={idx}
              name={name}
              description={description}
              fileName={fileName}
              linkedin={linkedin}
              github={github}
              personalSite={personalSite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data } = await RequestHelper.get<TeamMember[]>(
    `${protocol}://${context.req.headers.host}/api/members`,
    {},
  );
  return {
    props: {
      fetchedMembers: data,
    },
  };
};
