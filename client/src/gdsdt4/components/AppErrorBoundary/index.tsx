import React, { ErrorInfo, ReactNode } from 'react';

class AppErrorBoundary extends React.Component<
    { children: ReactNode },
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        console.log('error: ', error);
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log('errorInfo: ', error, errorInfo);
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div style={{ fontSize: 30, marginTop: 4 }}>
                        Ah! Something went wrong.
                    </div>
                </>
            );
        } else {
            return this.props.children;
        }
    }
}

export default AppErrorBoundary;