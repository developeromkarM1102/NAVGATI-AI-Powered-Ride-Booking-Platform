interface RideRequestErrorProps {
    error: string;
    onRetry: () => void;
}

export default function RideRequestError({
    error,
    onRetry,
}: RideRequestErrorProps) {
    return (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-bold text-red-600">
                {error}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
            >
                Try Again
            </button>
        </section>
    );
}