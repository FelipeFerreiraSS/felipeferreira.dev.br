'use client'
import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";

export default function Dashboard() {
  
  return (
    <>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authResult = await authenticateUser(ctx);

  if ('redirect' in authResult) {
    return authResult;
  }

  const { userType } = authResult.props;
  console.log('userType', userType);
  
  if (userType === 'editor') {
    return {
      redirect: {
        destination: '/dashboard/editor', // Redireciona para o editor se for editor
        permanent: false,
      },
    };
  } else if (userType === 'admin') {
    return {
      redirect: {
        destination: '/dashboard/admin', // Redireciona para o admin se for admin
        permanent: false,
      },
    };
  } 

  return {
    props: {}
  }
}