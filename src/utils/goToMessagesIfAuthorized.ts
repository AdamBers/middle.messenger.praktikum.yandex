import AuthApi from "@/api/auth";

export async function goToMessagesIfAuthorized() {
  const myAuthApi = new AuthApi();
  const isAuthorized = await myAuthApi.me();
  console.log(isAuthorized);

  if ("status" in isAuthorized && isAuthorized.status === 200) {
    console.log("success");
    window.router.go("/messenger");
  }
}
