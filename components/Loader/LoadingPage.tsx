import Spinner from "./Spinner";

function LoadingPage() {
  return (
    <div className="absolute left-0 top-0 bg-gray-900/90 h-screen w-full flex items-center justify-center">
      <Spinner color="red" />
    </div>
  );
}

export default LoadingPage;
