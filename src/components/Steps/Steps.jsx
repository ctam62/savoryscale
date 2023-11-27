import './Steps.scss';


export const Steps = ({ steps }) => {
    return (
        <section className="steps">
            {steps?.map(step =>
                <article className="steps__item" key={step.number}>
                    <h3 className="steps__item-number">{step.number}</h3>
                    <p className="steps__item-description">{step.step}</p>
                </article>
            )}
        </section>
    );
};
