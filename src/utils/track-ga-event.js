import ReactGA from "react-ga4";

export const TrackGoogleAnalyticsEvent = (
    category,
    event_name,
    label,
    data
) => {
    let event_params = {
        category,
        label,
        ...data
    };
    // Send GA4 Event
    ReactGA.event(event_name, event_params);
};