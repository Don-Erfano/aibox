import UserInfoTab from '@/components/pages/user-list/user-info-tab/user-info-tab';

const UserInfoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return <UserInfoTab userId={id} />;
};

export default UserInfoPage;
