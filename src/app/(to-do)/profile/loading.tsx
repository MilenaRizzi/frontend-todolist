export default function ProfileLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="text-lg font-semibold text-gray-600">
          Carregando, por favor aguarde...
        </p>
      </div>
    </div>
  );
}
