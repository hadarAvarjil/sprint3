const { useState } = React

export function LongTxt({ txt, length = 20 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = txt.length > length
    const textToShow = isShowLong ? txt : (txt.substring(0, length))
    return (
        <section className="long-txt">
            <h4>
                {textToShow}
                {isLongText &&
                    <span >
                        {isShowLong ? ' ' : '...'}
                    </span>
                }
            </h4>
        </section>
    );
}