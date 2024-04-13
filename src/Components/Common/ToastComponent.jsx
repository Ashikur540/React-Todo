import { Toast } from "@shopify/polaris";
import { memo } from "react";

let ToastComponent = ({ isActive, content, toggle, error }) => {
    if (isActive) {
        return (
            <Toast
                content={content}
                onDismiss={toggle}
                duration={3000}
                error={error}
            />
        );
    }
    return null;
};
ToastComponent = memo(ToastComponent)
export default ToastComponent;