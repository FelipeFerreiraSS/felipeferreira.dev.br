'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import Layout from "@/components/layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchAnalytics } from "@/store/features/analytic/truckFunctions";
import PostsByMonthChart from "@/components/dashboard/postsByMonth";
import PostsPerTagChart from "@/components/dashboard/postsPerTag";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound, Clock2, Images, NotebookPen, NotebookText, RefreshCw, Tag } from "lucide-react";
import Image from "next/image";

export default function DashboardAdmin() {
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch()

  const analyticState = useSelector((state: RootState) => state.analytics.analytics)

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  useEffect(() => {
    if (analyticState !== null && analyticState !== undefined) {
      setLoading(false);
    }
  }, [analyticState]);

  if (loading || !analyticState) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="animate-spin"><RefreshCw size={30} /></div>
      </div>
    );
  }
  
  return (
    <Layout pageTitle="Dashboard">
      <div className="flex gap-5 mb-5">
        <Card className="max-w-52">
          <CardHeader>
            <CardTitle 
              className="bg-slate-300 dark:bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center"
            >
              <NotebookText size={40} />
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Posts publicados</p>
            <h3 className="font-bold text-5xl">{analyticState?.postsPublished || 0}</h3>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //const apiClient = getAPIClient(ctx)
  //const { ['felipeferreirablog.token']: token } = parseCookies(ctx)

  const authResult = await authenticateUser(ctx);

  if ('redirect' in authResult) {
    return authResult; // Retorna o redirecionamento se necessário
  }

  const { userType } = authResult.props;

  if (userType !== 'admin') {
    return {
      redirect: {
        destination: '/dashboard/editor', // Redireciona para o editor se não for admin
        permanent: false,
      },
    };
  }

  // Chamada API do lado do servidor
  //await apiClient.get('/users')

  return {
    props: {}
  }
}