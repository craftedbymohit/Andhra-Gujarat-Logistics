const LAMP_POST_PATH = 'M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0zM232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z';

/** AGL-branded truck loader based on the attached loader design. */
export default function PageLoader({ isExiting = false }) {
  return (
    <div className={`loader${isExiting ? ' loader--exiting' : ''}`} role="status" aria-label="Loading">
      <div className="truck-wrapper" aria-hidden="true">
        <div className="truck-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 258 93"
            className="truck-svg"
          >
            <rect
              strokeWidth={3}
              stroke="#282828"
              fill="#DFDFDF"
              rx="2.5"
              height="90"
              width="181"
              y="1.5"
              x="6.5"
            />
            <text
              x="97"
              y="58"
              textAnchor="middle"
              fill="#0F6CBD"
              fontFamily="Arial, sans-serif"
              fontSize="27"
              fontWeight="800"
              letterSpacing="2"
            >
              AGL
            </text>
            <path
              strokeWidth={3}
              stroke="#282828"
              fill="#0B99EE"
              d="M195 22.5H237.264C238.295 22.5 239.22 23.133 239.594 24.0939L252.33 56.8443C252.442 57.1332 252.5 57.4404 252.5 57.7504V89C252.5 90.3807 251.381 91.5 250 91.5H195C193.619 91.5 192.5 90.3807 192.5 89V25C192.5 23.6193 193.619 22.5 195 22.5Z"
            />
            <path
              strokeWidth={3}
              stroke="#282828"
              fill="#EAF8FF"
              d="M206 33.5H241.741C242.779 33.5 243.709 34.1415 244.078 35.112L250.538 52.112C251.16 53.748 249.951 55.5 248.201 55.5H206C204.619 55.5 203.5 54.3807 203.5 53V36C203.5 34.6193 204.619 33.5 206 33.5Z"
            />
            <rect strokeWidth={2} stroke="#282828" fill="#FFFCAB" rx={1} height={7} width={5} y={63} x={249} />
            <rect strokeWidth={2} stroke="#282828" fill="#282828" rx={1} height={11} width={4} y={81} x={255} />
            <rect strokeWidth={2} stroke="#282828" fill="#DFDFDF" rx={2} height={4} width={6} y={84} x={187} />
          </svg>
        </div>

        <div className="truck-tires">
          {[0, 1].map((tire) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              className="tire-svg"
              key={tire}
            >
              <circle strokeWidth={3} stroke="#282828" fill="#282828" r="13.5" cy={15} cx={15} />
              <circle fill="#DFDFDF" r={7} cy={15} cx={15} />
            </svg>
          ))}
        </div>

        <div className="road" />
        {[0, 1].map((lamp) => (
          <svg
            key={lamp}
            xmlSpace="preserve"
            viewBox="0 0 453.459 453.459"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className={`lamp-post lamp-post--${lamp + 1}`}
          >
            <path d={LAMP_POST_PATH} />
          </svg>
        ))}
      </div>
    </div>
  );
}
