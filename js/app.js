d3.json("data/samples.json").then((data) => {
    console.log(data);
    console.log(data.samples[0]);
    var otu_ids = data.samples[0].otu_ids;
    console.log(otu_ids)
    var sample_values = data.samples[0].sample_values;
    console.log(sample_values);
    var otu_labels = data.samples[0].otu_labels;
    var top_labels = otu_labels.slice(0,10).reverse();
    console.log(top_labels);
    var top_values = sample_values.slice(0,10).reverse();
    console.log(top_values)
    var top_ids = otu_ids.slice(0,10).reverse();
    console.log(top_ids)
    var ids = top_ids.map(name => "OTU "+name);
    console.log(ids)
    var meta = data.metadata[0];
    console.log(meta)

//dropdown menu holder
var init = meta.id;
    console.log(init);
    var dropdown = d3.select("#selDataset");
    var init_option = dropdown.append("option").text(init);

// bar chart
var trace1 = {
    x: top_values,
    y: ids,
    type: "bar",
    orientation: 'h',
    name:top_labels
  };
  
  var data = [trace1];
  
  var layout = {
    title: "Top 10 Bacteria Cultures Found",
    xaxis:{title: "Sample Values"},
    yaxis: {title:"OTU ID"}
  };
  
  Plotly.newPlot("bar", data, layout);

  var trace2 = {
    x: otu_ids,
    y: sample_values,
    text:otu_labels,
    mode:'markers',
    marker: {
      size: sample_values,
      color:otu_ids}
      
  };
// bubble chart
  var data2 = [trace2];

  var layout2 = {
    title: 'Bacteria Cultures Per Sample',
    xaxis:{title: "OTU ID"},
    yaxis: {title:"Sample Values"},
    showlegend: false
  };

  Plotly.newPlot("bubble",data2,layout2)

  //metadata
  Object.entries(meta).forEach(function([key,value]) {
    console.log(key,value)
    console.log(key +": " + value);
    var demo_box = d3.select("#sample-metadata");
    var line = demo_box.append("h4");
    line.text(key.toUpperCase() +": " + value);
  });
});



  