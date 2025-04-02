import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ようこそ！！
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>
                                {props.name}
                                さんのページ
                            </p>

                            {/* 注文履歴の表示 */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">注文履歴:</h3>
                                {props.orders.length > 0 ? (
                                    <ul>
                                        {props.orders.map((order) => (
                                            <li key={order.id} className="text-gray-700">
                                                <div>
                                                    <p>注文番号: {order.id}</p>
                                                    <p>注文金額: ¥{order.total_price}</p>
                                                    {/* created_at の表示 */}
                                                    <p className="mb-4">注文日: {new Date(order.created_at).toLocaleString()}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No orders found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}