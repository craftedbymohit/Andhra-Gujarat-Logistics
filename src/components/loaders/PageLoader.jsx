/** Shown while a lazily-loaded route chunk is fetched. */
export default function PageLoader() {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <div className="loader__bar">
        <span />
      </div>
    </div>
  );
}
