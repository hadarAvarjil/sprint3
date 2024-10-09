const { useState } = React

export function LongTxt({ txt, length = 20 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = txt.length > length
    const textToShow = isShowLong ? txt : (txt.substring(0, length))
    return (
        <span className="long-txt">
            {textToShow}
            {isLongText && (
                <span>
                    {isShowLong ? ' ' : '...'}
                </span>
            )}
        </span>
    );
}