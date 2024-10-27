'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import Layout from "@/components/layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchAnalytics } from "@/store/features/analytic/truckFunctions";
import PostsByMonthChart from "@/components/dashboard/postsByMonth";
import PostsPerTagChart from "@/components/dashboard/postsPerTag";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound, Clock2, Images, NotebookPen, NotebookText, Tag } from "lucide-react";
import Image from "next/image";

export default function DashboardAdmin() {
  const dispatch: AppDispatch = useDispatch()

  const analyticState = useSelector((state: RootState) => state.analytics.analytics)
  console.log(analyticState);

  useEffect(() => {
      dispatch(fetchAnalytics());  
  }, [])
  
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

        <Card className="max-w-56">
          <CardHeader>
            <CardTitle 
              className="bg-slate-300 dark:bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center"
            >
              <NotebookPen size={40} />
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Posts não publicados</p>
            <h3 className="font-bold text-5xl">{analyticState?.postsDraft || 0}</h3>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>

        <Card className="max-w-52">
          <CardHeader>
            <CardTitle 
              className="bg-slate-300 dark:bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center"
            >
              <Tag size={40} />
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Total de Tags</p>
            <h3 className="font-bold text-5xl">{analyticState?.tags || 0}</h3>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>

        <Card className="max-w-52">
          <CardHeader>
            <CardTitle 
              className="bg-slate-300 dark:bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center"
            >
              <Images size={40} />
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Total de Imagens</p>
            <h3 className="font-bold text-5xl">{analyticState?.images || 0}</h3>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>

        <Card className="max-w-72">
          <CardHeader>
            <CardTitle 
              className="bg-slate-300 dark:bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center"
            >
              <Clock2 size={40} />
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Média de leitura do post</p>
            <h3 className="font-bold text-5xl">{analyticState?.averageReadTime || '0:00'} Min</h3>
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>

      </div>
      <div className="flex gap-5 mb-5">
        <PostsByMonthChart analyticPostsByMonth={analyticState?.postsByMonth}  />
        <PostsPerTagChart analyticpostsPerTag={analyticState?.postsPerTag}/>
        <Card className="max-w-64">
          <CardHeader>
            <CardTitle>Top autor</CardTitle>
            <CardDescription>Autor que mais publicou posts no blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center mb-5">
            {analyticState?.topAuthor ? (
              <p>
                {analyticState?.topAuthor.type === 'admin' ? 'Administrador:' : 'Editor:'} { }
                {analyticState?.topAuthor.firstName} { }
                {analyticState?.topAuthor.lastName}
              </p>
            ) : (
              <div>Nenhum autor publicou posts ainda</div>
            )}
              {analyticState?.topAuthor ? (
                <Image
                src={analyticState?.topAuthor.profileImageUrl}
                width={100}
                height={100}
                alt="Picture of the author"
                className="rounded-full"
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100%" }}
                priority
                />
              ) : (
                <CircleUserRound size={200} /> 
              )}
            </div>
            {analyticState?.topAuthor ? (
              <h3 
                className="font-bold text-5xl flex items-center justify-center gap-5"
              >
                {analyticState?.topAuthor.postsPublished} 
                <span 
                  className="font-normal text-lg"
                >
                  posts publicados
                </span>
              </h3>
            ) : null}
          </CardContent>
          {/* <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Ultimo post publicado</CardTitle>
            {/* <CardDescription></CardDescription> */}
          </CardHeader>
          <CardContent>
            {analyticState?.mostRecentPost ? (
              <div className="flex gap-5">
                <Image
                  src={analyticState?.mostRecentPost.headerImage.imageUrl ?? '/default-image.png'}
                  width={400}
                  height={200}
                  alt="Picture of the author"
                  className="rounded-lg"
                  style={{ width: "400px", height: "200px", objectFit: "cover" }}
                  priority
                />
                <div>
                  <h2 className="font-bold text-3xl gap-5">{analyticState?.mostRecentPost.title}</h2>
                  <h3 className="text-xl flex gap-5">{analyticState?.mostRecentPost.summary}</h3>
                  <p className="text-base flex gap-5">Data de publicação: {new Date(analyticState?.mostRecentPost?.updatedAt || new Date()).toLocaleDateString()}</p>
                  <p className="text-base flex gap-5">{analyticState?.mostRecentPost.readTime || '0'} Min de leitura</p>
                  <ul className="flex flex-wrap gap-2 mt-4">
                    {analyticState?.mostRecentPost.tags.map((tag) => (
                      <li className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                      </li>
                    ))}
                  </ul>
                  <p className="text-base flex gap-5">Publicado por {analyticState?.mostRecentPost.author.firstName} {analyticState?.mostRecentPost.author.lastName}</p>
                </div>
              </div>
            ) : (
              <div>Nenhum post foi publicado ainda</div>
            )}
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