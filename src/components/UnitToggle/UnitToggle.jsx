import './UnitToggle.scss';


export const UnitToggle = ({ activeUnit, setActiveUnit }) => {

    const handelUnit = (unit) => {
        setActiveUnit(unit);
    };

    return (
        <div className="toggle__units">
            <p className={`toggle__unit ${activeUnit === "metric" ? "toggle__unit--active-left" : ""}`} onClick={() => handelUnit("metric")}>metric</p>
            <p className={`toggle__unit ${activeUnit === "us" ? "toggle__unit--active-right" : ""}`} onClick={() => handelUnit("us")}>us</p>
        </div>
    );
};
