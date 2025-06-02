import Avatar from "../../components/Avatar";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="animate-spin p-10">
        <Avatar seed="Yuvraj Support Agent" />
      </div>
    </div>
  );
}

export default Loading;