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
import { ChevronRight, CircleUserRound, Clock2, Images, NotebookPen, NotebookText, Tag } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

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
      <Layout pageTitle="Dashboard">
        <div className="hidden sm:flex gap-5 mb-5">
          <Skeleton className="h-40 w-52 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-40 w-52 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-40 w-52 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-40 w-52 rounded-xl bg-gray-200 dark:bg-zinc-800" />
        </div>
        <div className="block sm:hidden">
          <Skeleton className="h-10 w-full rounded-xl mb-3 bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-5 w-full rounded-xl mb-2 bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-5 w-full rounded-xl mb-2 bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-5 w-full rounded-xl mb-2 bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-5 w-full rounded-xl mb-2 bg-gray-200 dark:bg-zinc-800" />
        </div>
        <div className="sm:hidden">
          <Skeleton className="h-60 w-full mb-5 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-60 w-full mb-5 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-60 w-full mb-5 rounded-xl bg-gray-200 dark:bg-zinc-800" />
        </div>
        <div className="hidden sm:flex gap-5 mb-5">
          <Skeleton className="h-60 w-96 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-60 w-96 rounded-xl bg-gray-200 dark:bg-zinc-800" />
          <Skeleton className="h-60 w-96 rounded-xl bg-gray-200 dark:bg-zinc-800" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="h-60 w-full rounded-xl bg-gray-200 dark:bg-zinc-800" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout pageTitle="Dashboard">
      <div className="max-w-[1400px] hidden sm:grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-5">
        <Card className="max-h-40 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col justify-center p-4 gap-y-2">
            <div className="flex gap-3 text-gray-500">
              <NotebookText size={20} />
              <p>Posts publicados</p>
            </div>
            <div>
              <h3 className="font-bold text-4xl">{analyticState?.postsPublished || 0}</h3>
            </div>
            <div className="flex justify-between items-center gap-3 text-gray-500">
              <p className="text-sm">Todos os posts</p>
              <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                <Link href={'/dashboard/admin/post'}>
                  <ChevronRight size={15}/>
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="max-h-40 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col justify-center p-4 gap-y-2">
            <div className="flex gap-3 text-gray-500">
              <NotebookPen size={20} />
              <p>Posts não publicados</p>
            </div>
            <div>
              <h3 className="font-bold text-4xl">{analyticState?.postsDraft || 0}</h3>
            </div>
            <div className="flex justify-between items-center gap-3 text-gray-500">
              <p className="text-sm">Todos os posts</p>
              <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                <Link href={'/dashboard/admin/post'}>
                  <ChevronRight  size={15}/>
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="max-h-40 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col justify-center p-4 gap-y-2">
            <div className="flex gap-3 text-gray-500">
              <Clock2 size={20} />
              <p>Média de leitura por post</p>
            </div>
            <div>
              <h3 className="font-bold text-4xl">{analyticState?.averageReadTime || '0:00'} Min</h3>
            </div>
            <div className="flex justify-between items-center gap-3 text-gray-500">
              <p className="text-sm">Todos os posts</p>
              <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                <Link href={'/dashboard/admin/post'}>
                  <ChevronRight  size={15}/>
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="max-h-40 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col justify-center p-4 gap-y-2">
            <div className="flex gap-3 text-gray-500">
              <Tag size={20} />
              <p>Total de Tags</p>
            </div>
            <div>
              <h3 className="font-bold text-4xl">{analyticState?.tags || 0}</h3>
            </div>
            <div className="flex justify-between items-center gap-3 text-gray-500">
              <p className="text-sm">Todas as tags</p>
              <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                <Link href={'/dashboard/admin/tags'}>
                  <ChevronRight  size={15}/>
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="max-h-40 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col justify-center p-4 gap-y-2">
            <div className="flex gap-3 text-gray-500">
              <Images size={20} />
              <p>Total de Imagens</p>
            </div>
            <div>
              <h3 className="font-bold text-4xl">{analyticState?.images || 0}</h3>
            </div>
            <div className="flex justify-between items-center gap-3 text-gray-500">
              <p className="text-sm">Todas as imagens</p>
              <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                <Link href={'/dashboard/admin/gallery'}>
                  <ChevronRight  size={15}/>
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

      </div>
      <div className="sm:hidden max-w-full overflow-x-auto border-[1px] rounded-lg mb-5">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-center">Valor</TableHead>
              <TableHead className="text-center">Ver todos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex gap-1"><NotebookText size={20} />Posts publicados</TableCell>
              <TableCell className="text-center">{analyticState?.postsPublished || 0}</TableCell>
              <TableCell className="flex items-center justify-center gap-3">
                <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                  <Link href={'/dashboard/admin/post'}>
                    <ChevronRight  size={15}/>
                  </Link>
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex gap-1"><NotebookPen size={20} />Posts não publicados</TableCell>
              <TableCell className="text-center">{analyticState?.postsDraft || 0}</TableCell>
              <TableCell className="flex items-center justify-center gap-3">
                <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                  <Link href={'/dashboard/admin/post'}>
                    <ChevronRight  size={15}/>
                  </Link>
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex gap-1 whitespace-nowrap"><Clock2 size={20} />Média de leitura por post</TableCell>
              <TableCell className="text-center whitespace-nowrap">{analyticState?.averageReadTime || '0:00'} Min</TableCell>
              <TableCell className="flex items-center justify-center">
                <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                  <Link href={'/dashboard/admin/post'}>
                    <ChevronRight  size={15}/>
                  </Link>
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex gap-1"><Tag size={20} />Total de Tags</TableCell>
              <TableCell className="text-center">{analyticState?.tags || 0}</TableCell>
              <TableCell className="flex items-center justify-center gap-3">
                <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                  <Link href={'/dashboard/admin/tags'}>
                    <ChevronRight  size={15}/>
                  </Link>
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex gap-1"><Images size={20} />Total de Imagens</TableCell>
              <TableCell className="text-center">{analyticState?.images || 0}</TableCell>
              <TableCell className="flex items-center justify-center gap-3">
                <span className="p-1 rounded-lg cursor-pointer bg-gray-200 dark:bg-zinc-800 text-zinc-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-zinc-500">
                  <Link href={'/dashboard/admin/gallery'}>
                    <ChevronRight  size={15}/>
                  </Link>
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {analyticState?.postsByMonth && analyticState.postsByMonth.length > 0 ? (
          <PostsByMonthChart analyticPostsByMonth={analyticState?.postsByMonth} />
        ) : (
          <Card className="max-w-72">
            <CardHeader>
              <CardTitle>
                <p>Carregando dados do gráfico...</p>
              </CardTitle>
            </CardHeader>
          </Card>
        )}
        {analyticState?.postsPerTag && analyticState?.postsPerTag.length > 0 ? (
          <PostsPerTagChart analyticpostsPerTag={analyticState?.postsPerTag} />
        ) : (
          <Card className="max-w-72">
            <CardHeader>
              <CardTitle>
                <p>Carregando dados do gráfico...</p>
              </CardTitle>
            </CardHeader>
          </Card>
        )}
        <Card className="w-full sm:max-w-96">
          <CardHeader>
            <CardTitle>Top autor</CardTitle>
            <CardDescription>Autor que mais publicou posts no blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center items-center">
              {analyticState?.topAuthor?.profileImageUrl ? (
                <Avatar className="w-28 h-28">
                  <AvatarImage className="object-cover" src={analyticState?.topAuthor.profileImageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : (
                <CircleUserRound size={200} /> 
              )}
              <p className="font-bold">
                {analyticState?.topAuthor?.type === 'admin' ? 'Administrador:' : 'Editor:'}
              </p>
              <p>
                {analyticState?.topAuthor.firstName || ""} { }
                {analyticState?.topAuthor.lastName || ""}
              </p>
            </div>
            <div>
              {analyticState?.topAuthor ? (
                <h3 
                  className="font-bold text-4xl flex items-center justify-center gap-5"
                >
                  {analyticState?.topAuthor.postsPublished || '0'} 
                  <span 
                    className="font-normal text-lg"
                  >
                    posts publicados
                  </span>
                </h3>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Ultimo post publicado</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticState?.mostRecentPost ? (
              <div className="flex flex-col lg:flex-row gap-5">
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
                  <h2 className="font-bold text-3xl gap-5">{analyticState?.mostRecentPost.title || ""}</h2>
                  <h3 className="text-base flex gap-5 mb-3">{analyticState?.mostRecentPost.summary || ""}</h3>
                  <div className="flex gap-3 mb-3">
                    <p className="text-sm flex gap-5">{new Date(analyticState?.mostRecentPost?.updatedAt || new Date()).toLocaleDateString()}</p>
                    <p className="text-sm flex gap-5">{analyticState?.mostRecentPost.readTime || '0'} Min de leitura</p>
                  </div>
                  <ul className="flex flex-wrap gap-2 mb-3">
                    {analyticState?.mostRecentPost.tags ? (
                      <>
                        {analyticState?.mostRecentPost.tags.map((tag) => (
                          <li className="bg-blue-100 text-blue-600 px-2 py-1 rounded" key={tag.id}>
                            {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                          </li>
                        ))}
                      </>
                    ) : <li></li>}
                  </ul>
                  <p className="text-base flex gap-5">Publicado por {analyticState?.mostRecentPost.author.firstName || ""} {analyticState?.mostRecentPost.author.lastName || ""}</p>
                </div>
              </div>
            ) : (
              <div>Nenhum post foi publicado ainda</div>
            )}
          </CardContent>
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