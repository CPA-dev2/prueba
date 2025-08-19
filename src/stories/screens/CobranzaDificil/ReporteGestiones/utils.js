import { ACCIONES_COBRANZA_DIFICIL_READ } from "../../../../utils/constants";

const get_monday_date = () => {
    let monday = new Date();
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    let day = monday.getDate() <= 9 ? "0" + monday.getDate() : monday.getDate();
    let month =
      monday.getMonth() + 1 <= 9
        ? "0" + (monday.getMonth() + 1)
        : monday.getMonth() + 1;
    return day + "-" + month + "-" + monday.getFullYear();
  };
const get_saturday_date = () => {
    let saturday = new Date();
    saturday.setDate(saturday.getDate() - saturday.getDay() + 6);
    let day = saturday.getDate() <= 9 ? "0" + saturday.getDate() : saturday.getDate();
    let month =
      saturday.getMonth() + 1 <= 9
        ? "0" + (saturday.getMonth() + 1)
        : saturday.getMonth() + 1;
    return day + "-" + month + "-" + saturday.getFullYear();
  };
const get_today_date = () => {
    let today = new Date();
    let day = today.getDate() <= 9 ? "0" + today.getDate() : today.getDate();
    let month =
      today.getMonth() <= 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
    return day + "-" + month + "-" + today.getFullYear();
  };
const get_string_full_date = (_date)  => {
    let date = _date ? new Date(_date) : new Date();
    let day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    return day + "-" + month + "-" + date.getFullYear() + ' ' +  (date.getHours() <= 9 ? ('0' + date.getHours()) : date.getHours() ) + ':' + (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes() );
  };
const get_html = (data, filtros_gestiones, user) => {
    const asesor = user.first_name + ' ' + user.last_name;
    const from = filtros_gestiones.from;
    const to = filtros_gestiones.to;
    const primary_color = 'black';
    const secondary_color = 'gray';
    let gestiones = "";
    data.forEach((gestion) => {
        gestiones =  gestiones + '<div>'  +
        '<table style="font-size: 5px; margin-top: 10px; margin-bottom: 10px; width: 100%; padding: 0; border-bottom-style: dashed; border-bottom-width: 1px; border-bottom-color: ' + primary_color + ';">' +
          '<tbody>' +
          '<tr>' +
            '<td style="width: 50%;"></td>' +
            '<td style="width: 50%;"></td>' +
          '</tr>' +
          '<tr>' +
            '<td style="color: ' + secondary_color + '; text-align: left;" colspan="2"><span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + gestion.cliente?.nombres.toUpperCase() + ' '  + gestion.cliente?.apellidos.toUpperCase() + '</span>' + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="color: ' + secondary_color + '; text-align: left;">' + 'Tipo: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + ACCIONES_COBRANZA_DIFICIL_READ.find((e) => e.value === gestion.tipo_gestion)?.label + '</span>' + '</td>' +
            '<td style="color: ' + secondary_color + '; text-align: left;">' + 'Asesor: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + gestion.asesor_cobranza_dificil.nombres + ' ' + gestion.asesor_cobranza_dificil.apellidos + '</span>' + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="color: ' + secondary_color + '; text-align: left;">' + 'Fecha: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + get_string_full_date(gestion.creado) + '</span>' + '</td>' +
            '<td style="color: ' + secondary_color + '; text-align: left;">' + 'Saldo pendiente: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + "Q" + gestion.saldo_pendiente.toFixed(2) + '</span>' + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="color: ' + secondary_color + '; text-align: left;" colspan="2">Detalle: <span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + gestion.detalle + '</span>' + '</td>' +
          '</tr>' +
          '</tbody>' +
        '</table></div>';
    });
    const title_table = '<div>'  +
      '<table style="font-size: 5px; margin-bottom: 1px; margin-top: 1px; width: 100%; padding: 0; border-bottom-style: solid; border-bottom-width: 0.1px; border-bottom-color: ' + primary_color + ';">' +
        '<tbody>' +
        '<tr>' +
          '<td style="font-weight: bold; text-align: left; width: 50%;">REPORTE DE GESTIONES</td>' +
          '<td style="color: ' + secondary_color + '; width: 50%; text-align: right;">' + get_string_full_date(new Date())  + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="color: ' + secondary_color + '; text-align: left;" colspan="2">' + 'Asesor: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + asesor + '</span>' + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="color: ' + secondary_color + '; text-align: left;">' + 'Desde: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + from + '</span>' + '</td>' +
          '<td style="color: ' + secondary_color + '; text-align: left;">' + 'Hasta: ' + '<span style="font-weight: bold; text-align: left; color: ' + primary_color + ';">' + to + '</span>' + '</td>' +
          '</tr>' +
        '</tbody>' +
      '</table></div>';
    const logo = '<img style="display: block; margin-left: auto; margin-right: auto;"' +
      'width="100px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAAA2CAYAAACx+8n+AAAAAXNSR0IArs4c6QAAFWpJREFUeF7tnQl0VMW2hned7iRIiCIqiqLgPCA4pLtRQEUQZ1BQHMAR0YdX1KA8BbkKAioIiIAjAiriiCMq4IyKIulGEQ1eZxRxNiAkIJ3uU2999VJ5h5MOcpOb9ZJwaq2spLvPqdp717//PVRzUBKMwAL11AKqnsodiB1YQALwBiCotxYIwFtvty4QvBJ4Bw0atJfWun0qlQoF5gksUFcskJ2dvWrChAkLlFLayuQFryooKOijtZ5VVwQO5Ags4LPAzKysrH+MHz++lPcrwDtixIjw6tWr54tI18BkgQXqqAXWuq576pQpU96tEXi11qJUkDLX0U1uqGKltdanTp48GZKtHvMC3D322EN++eUXSSaTDdVQgV51zAJa67SIVB+8AHeXXXaRyy67TH766SeZOnWqOI5Tx9QMxGmIFqgxeNu0aSM9e/aUUOh/mxFffvmlPP/887J+/fqGaK9ApzpkgWqD13Vd2X///eXMM8+U7OzsCpVg4hUrVsj06dMlKyurDqkaiNLQLFBt8NpUoaoi7ZtvvpFnnnkmYOB6hBj2skmTJrJu3bp6IXW1wQurHn744XLCCSdUdBlKSkoERt52220FBiaFePTRR4McuF5AQeSggw6SY489Vr799lt5/fXX63zxXW3wmtaEUnLkkUdK165dZe3atfL222+bjgOpRNOmTeW9996T3377Tb766ivZsGFDPdnCrU9MiGb77beXSy65RCAgahaK77peeNcIvHabDzvsMKN8NBqVP/74Q959913ZeeedDQvjyaQQTz/9tGzcuHGLkMF9/HgHjsKP16AYPZ2mW7Lp4Bq/4TPN6b0rHA6bl/a6zc2BHLZAZX3k8A7utfJWpbBdh+tY2z9HVfdxHfdaeVnfq+uW2o75rezM2apVK9lmm23MXtHutHJxXSqVqiSO3Qt/2ui3Xyb7+PfV2tLKxGt0sutW5UQ1Bi+Kt2zZ0ngtirDgU089ZYzbu3fvipQCT7733nsrNn1zKAbwRx999CaXMC9pyNy5cw07YKR27drJGWecUWkq1nr55Zflhx9+MOsjY5cuXSrN6b3xtttuM/k5MjPvRx99JHPmzKm4hPVIkTp06CBffPGFSYdIj/r162cc1zvIGRcuXCjxeDwjKJHpggsukNatW8uff/4pt956qzRu3PhvHZtNxC7HHHNMxbXo+sgjj5jIhozMu/fee1ey3WeffWYY1ZICkfGiiy6S7bbbLuO6XHfzzTebfRw6dGiFs9iLkZtIu2TJkgrn4Z6zzz7bpB/Y6OGHH5arr75amjdvXqVukN348eNN0b/jjjvKWWedZYjPjg8++MCkMJlIqsbgRVAAZD2FDUeQU045pdKJ29dffy3PPvvsZos45unRo4cccsghRmDrfRgRj1yzZo088MADBsCnnXaaybu91wEM2/1AaaKABctee+21ybXWQKxxzz33GMY599xzhesY9913n/z888/mfjbm9NNPF6LMO++8I2+99Zbstttu0rdvX2nUqFEFi3kZixSKiEPq5GUoujS9evUycuJYd9xxh9Fnc2zbtm1b44A4SllZmbELdYdl7dmzZ8uHH35oHAEbootlc+zGdX/99ZfMmjVLVq1aZXQEaMzBfH7m/+6774xTcPh06aWXms8ti3p1/P333+WJJ54wEZc1Lr74Ytl1110N4HDegoIC876NVvxmHutEhYWF8v7778uJJ54o6Mj79qArJyfH3AcJQRbI7x01Ai+KsXlsAsakPbbDDjsYUGVqk2EAjMJ1Nuz5N4xrMFaLFi1kwYIFhsFQAG+07P7KK68ISl944YXGuHjnG2+8YabCMPSdMQQGBeiw0vDhw82mcm8ikaiEE9ZF9j59+lSwEcYaO3asuQ8d2WzY8tVXX5XFixcbAJxzzjmmOse4dgNhZ9gRudGXzyxz8HvQoEGGtdkogGWdoarwiMOcdNJJ5tply5aZiID9uB+w5ObmysSJE816N910k9Ft9OjRFQ5j9WJNa7v99tvPRJni4mJ5/PHHTc3iH8h6xBFHyPHHH29IAwdnn5HD6ojMn3zyibzwwgvGbueff77RDWeCfa1TsE/Yiuv5DCJjoMPAgQMN62JvyA2bcV9+fr6JdgzbfvW1Zat3woZi3bp1k/bt25uNJYyQLgCaSCSSEZwIhBc99thjlbzIGg7lCKFca0Mhn/GaTWKDbPEH49nX3hyZOcjfeI9UwM7JPGySP0+zoLH3eTcRPTGq/Qw5eM3cMAMgstfY+2xOigwMqwfrogNzWLnQgVFaar4YVWnY9hVzMg/g8ee4vMce8GNJAya3erIe6yArdQfXW9n5219Me/N1ex3s7D36Rx7W43MrP6BmHa+NrELIxfXch/0sqGnNMZjfymH141ruq2rOGjEvAnTs2FGOO+44Yyg2gFyTcMr7/kF+BnA3FyLxQBiBucmZrEJ5eXmG5QEK76N09+7djXLkwT/++GMF83bu3Fk4+fv+++8NI+yzzz6GuRj+EI6hkImNJTcjnKPHypUr5YADDjBghw3YJORis0kFYFu6LDAYYRg29DrF7rvvbkIhG/7iiy8ahoN9eI97kYv1eM3GEaL93wth80ifsCWf3X///VUe/GAvagVkhkhID2whBBOSikEKb775pmFE0jqKNNbmeu+A+Qj53A/rch01ANHOgo7f2JgcnD2aOXOmybXBAjZDZ9sv5tpDDz3UdKawP/bkPfaUlBPbvvTSS8aO/gGW2GecnZzdGyFqBF4Wwqgnn3yyYWAAwMaTFiAo+ag1ICGVgi1T4m0FRiFY+9RTTzXz3nnnnQYQAJVUhFzq888/NwxvQzZMwmEIuSlAJNQAXu7nexYYC9AdfPDBZplMVf0NN9xgvDsWixmQcw+bTPHA+k8++aTZCIozHG/SpElmwwj/O+20k8mryfG8jHjggQealiHGxtn4jRyAi3SInJmDHlIkBuDF2fysf9VVV5mQijNtDrw41XnnnWdOPUktSA8YsB22I92BPGwaNWzYMGPXTPagEENGwEUahZyvvfaaLFq0qEI8HKtTp04m+mKvu+++2zgZr1lnxowZFfUKsmFLovLy5csNWUA62ALwggnkAiP+gR25d/Xq1RVpiwcv1Usb7AQogcfBQACPRfAiWIUcCIUwPICrKjTauWABciY2wD9svoz3wRTkgbBJpgFQyEvZROQjD2QTYQ9Yxz+oxLkOIMGYbBJsDlj33HNP4whU1TgkDA+IcJoRI0YY0AM8cjjLvOhBfsxm0fAHvDAoIGIjATr3cy+5MekFzI18XvZGJtbgPZvzVVUrQBKAF5Bmsh299vnz5xuAwGIUdswFQ7Iv3nUhAnJc9g+bwIzsH90eOwAfzsm+I/dzzz1ncloK+E8//dTktdaZsce1115rik2cFsewREMEwBYQHsWfd2B38mHqH6LBtGnTNklHa8S8AArhqdABAEKwMXgK7TMUgPEIkZl6hX4j44HXX3+9yQthOnIjW22iMMrZ4hC2p5hAQRv2mjVrZph+3rx5poiz/VbAi6x0D3799deMgGe9MWPGGOMQIbiODbz99ts3CdXW+LSaYF4G99keNoDD+WAsBuEUMFx33XUZ17Vv4jCwm5cJscc111xjDnywn21d2XtYE1aEMAAGaRXFmbUdoCNlwG4UjejDwE5XXnml+ds6RybhICDAy9owI6kPAxkhLIiGz+g2FBUVyeDBg836RC32y0Zd9uHGG2809wJAmx4AdIprPn/wwQfN+1Z/dKdYg/x4jz30O261wYs32SrY9ig//vhjswC5EOPv2MJvMMIYHsq46667zKYzbKvFXs/aAwYMMA5C1Y9zYAC8GHaEBWEKgE2qwQYAKqpqb2HHfNwHG/P+yJEjjbMQUnES/j7qqKNMGmKZCWAjlw2Z3Afr2CKHrghOxfukE4RgGBdbwR42N7e6wOwAkMMBwqk3rbLkYB2BYpcIwDXYnNYZG05+S25Ij5fP0BOmBdDobqt/QjZzkmcjI3YE1N5DAuQicgF4ogXtQZyENASgoiegtqACpPxgryFDhpi5ALrVk/WIZnSK2A8Y39qSiHP55Zeb9IQ1iAI4GLqRFnLohR3pJEFG/kK7WuBFIAyHAn7F7aaQG5JzbumXPJgTxoLFySfHjRtX5akT1+LJrE0+CuujGGEaoLCBsCxMQUuHooOR6YvyGGfUqFEmQti1aTPZlow9iLDNfBiATcR5KMAY/k4H8pF2ADRy4v79+xtdYBfrkJbBrHzYiXaXPwfltQW/vYf3bEhmU0mRAAhtMzYfu2NDb9glNbjlllvM/EQBgM3f9jTNSySAhUhABLW1gtXROin3QRrY3gKUNAvbA1B7Pa8p4ijscIgJEyaYdMkOogp5PfNyDyCGrEhLmJc0kfQv06gWeJkI4xA2oH6/RxByH3roIZNb+T/LKEU5AEjOKfJIA+haVHUvHgsjMGA927wm3SDUEC5hmaVLl5oCLlMObeXgIIFUB2ckt+I1m2fXxvjkpYCDv2FHPqPQsK0wOxefE8JtscRr0hsKLpiIcOp1djYHxrQnZmxUVd8BQS8cwR6IQA70h6kn2Gg6KhScgBcGsyF23333NbUIA7DBquTj3n6pf09gUnJ1dMR5vcPqiC4wN04E6IgsYAG56CbYlh06UgTjLBRy3OfvZwNg7A9BIDc2wI7k6Jbt/6PgtSxAqIbe7aDyJGyx+L87UNQyT1UNezun9Wz/dX6G8M6ZSR7LJPY6b4/TvxavvT1I/3yszedemf5Op7/73OsYbCwOY3uzfkfIZLtM8/tTJ78e1gaZrsukozcieG20Oft510RG5kU3exKIY1QV1e291WZeOwGsx0kXhRuhiXAd/CuKf9dt6/f1gA/A298WzPy26YB1aOtg9noPECuM4L12c5G7xuBlRfIU+ryEGsLWlqYK9XvLAumxAN0FCk6OiCnwKDxJHSi4SE3oy5PXgw1SJ4psWJbcn79JEUiH7Jd3iCp0dEhXSEVI/apKpf4j4A22ceu0AKGdDgPFJl0YDpcAK10RDmRoE9qOBfk5haVto/JNMlJOvmdCh4YcmVM40k5qDv6mj0/tk+m7KOXsXrNDiq1z2wKtsQDdJkBHQcohC50J8lQKbgBJq5BOCT1gvmbKsTqHDjAyRTJFpm1z0rqDbQEu7Ev/lyhO+5QT1EyHMwHzBjislgUAFa05gErqQNeHXBWQ0j0AqHQ5YF6KdwDLoRWngDAwp3N0duhKkXLSIYKdSUGvuOIK85p0gTqKQxB/CzFg3mptW3CT7fOTuwJA8ltSCMI7Byr85uCHv8lfYVJYmt4xeSzH6ZwGUtjT6uMQiAMcgAvQabkBZNbhM0Dv//JQ+S6ktNbdKz0xp3fv3qEWLVrMV0odF2xXYAF/a4sije9JAFpOxGBiXlN40efnNaHefl+BooxrSTN4D2alNeb9WqVt69GLJo/mNUUdeTD3ZhgrtdYnT548+VPT2fBeMGTIkNYbNmxYKCJ8MTV4EFmA4bpkAf5B5EOTJk26ga9bVAIvbxQUFDQVEZ7RGzyfty5t3VYsi+u6KhwOr5o4ceImXwAO2HUrBkV9V70CvOS8K1aseFJrHTyft77vasOV/3et9dlLliz5cJO0IT8/P8txnHnBw6Ub7s43AM3MIUU8Ht/0+bydO3cOl5aWBk9GbwA73IBVyAzecuYFvF0asPKBavXbAi593kQiMdffbXBisdgkETmlfusXSN+ALfCN1vrieDy+MmOrjK+wNmDlA9XqtwXo72b8r6zqt1qB9FudBYI+7//zlufn57dwHCfiOE5uKpVaumTJkn95RFKRSGTS+vXrBy9fvrzK/7mmXbt2udnZ2aMSicQ1taCOisViRxQWFv7fQxxquEgsFttBRC5RSj2cTqcPTCQSC8qndKLR6JR4PD7Qy7BVLReAt4YbUdPbY7FYf9d1v0un00VZWVkbtdaNlVKjRWRlSUnJyCZNmszSWl+llDqosLDwzUgk0kNr/b7jOF2VUme6rvt6KBT6NpVK8TCw7ZRS/621LsrLyxtfWlo6ln9+qJTaNZ1OD8jKymqVTqc5Xk2Ew+GpqVRqqFKqVWlp6aCioqLi/Pz8AxzHuV5rvS6ZTA5dtmxZafv27Y9wXXey1nom/6Y1kUhMjcVihyilmi9evPg19I/FYrdorXO11qSc7yileiul7lRKFbmuO4b74vF4QTQa5XGXVyilflBKzUun098rpVqGQqEf0+n0MBF5UUR6OY5zs+u6g0VkXTwevzoAb01RVkv3R6NRDoUuF5FFruu+7DjOxLKysnOzsrIGKqU+F5FDReQprfVh8Xh8ZiQSuUhE/nAcZ//i4uJJzZo1O6C8iAEcEzdu3PjPRo0a9XBddw0ASiaTXbKzs3loQ6GI9Eyn03eHQqFrysrKhoXD4b6O47zUuHHjpQsWLEgBSq01z0DtJyLj4vF4UX5+fiel1JFa6xeVUr0SicStkUikHw5ElOjYsWNeMpmc47pub8dxxiulXlZKLXVdF9DhTPyPqvtprZfQo83NzR1ZWlr6X0opDhp4zmtL13UvzsnJOSmZTI4E8Ol02kQfpdQ/EolE36pYOGDeWgLllkzbuXPnpuvWrds9nU6vDIfDNyqlOEH6S2t9l1LqPoAgIvw3S4Y9k8nkPEDtOM4xyWSyj+M4pXl5ecmSkpKxiUTi2kgkMiWRSFwZiURgt39prc9NJBL9o9HoQqXUQ67rbs/75aB6T0T2FJF/tmrVqlubNm303LlzHxCRl7TWw3Nyco5duHDh6mg02t1xnNVa61XpdLqniExxHGdkWVnZ2KVLl66JRqM8WLlDPB4fE41G3w+Hw11TqVRMRHjc404iMgdWLl+3azwevyMajY5wXfeFUCh0luu63+CMWus5juM8LiLDcRYRwRaXxONxHpO06dO8y40bgHdLUFZL17Rt23b7Ro0a3ae1bu44zjNNmzZ9sLi4eJZSqpHWejSbLiJ/hsPhdYRupdQy13V/ysrKeiyVSnGU/3MoFOqXTqdPSSQSj0ej0Xtgaq31BBHJDYVCicWLFy+PRqNLc3NzO5eUlExzHGcbx3HGpdNpGP9o2LmwsPA5iC4Wi/F7rda6RTwe74ba5aGekM4jgGDTZiJSFA6HRy1atGhDNBq91HGcD1Op1FeO48yIx+NnRCKRAhF5WynF8wo68MSC1q1bT1uxYsUMEdlWKbWwrKxsVjgcnp6bm9u7tLQUJ/1JRPbfuHFjp5ycnOla67zyOd4Skf6wuuu617Vu3XrA7NmzzePxA/DWEjCDaWvfAgF4a9/GwQq1ZIEAvLVk2GDa2rdAAN7at3GwQi1Z4H8ApWQRCVAC/RAAAAAASUVORK5CYII=" />';
    const _page_styles = '<style> @page{ margin-left: 3pt; margin-right: 3pt; margin-top: 3pt; margin-bottom: 3pt; padding-left: 0pt; padding-right: 0pt; padding-top: 0pt; padding-bottom: 0pt; } </style>';
    const body = '<body>' + _page_styles + logo + title_table + gestiones + '</body>';
    const html = '<html>' + body + '</html>';
    return html;
  };

export const report_utils = {
    get_monday_date,
    get_saturday_date,
    get_today_date,
    get_string_full_date,
    get_html,
};
