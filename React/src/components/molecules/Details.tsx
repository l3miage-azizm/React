import "./Details.css";

export default function Details(props: { details: string }) {
  return (
    <div className="det111">
      <table className="tableDet">
        <tbody>
          {props.details.split("/").map((item, i) => (
            <>
              <tr>ETAPE {i+1} :</tr>
              <tr>{item}</tr>
            </>))}
        </tbody>
      </table>
    </div>
  );
}
